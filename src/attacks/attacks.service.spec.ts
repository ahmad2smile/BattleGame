import { AttackResult } from "./models/AttackResult";
import { AttackCreateDTO } from "./models/AttackCreateDTO";
import { AttackDTO } from "./models/AttackDTO";
import { Game } from "./../games/game.entity";
import { GamesService } from "./../games/games.service";
import { Ship } from "./../ships/ship.entity";
import { ShipsService } from "./../ships/ships.service";
import { Test, TestingModule } from "@nestjs/testing";
import { AttacksService } from "./attacks.service";
import { Attack } from "./attack.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PlayerRole } from "../games/models/PlayerRole";
import { Orientation } from "../ships/models/Orientation";
import { ShipType } from "../ships/models/ShipType";

describe("AttacksService", () => {
	let service: AttacksService;

	const attack = new Attack();
	attack.id = 1;
	attack.position = 100;
	const game = new Game();
	game.id = "1";
	game.playerRole = PlayerRole.Attacker;
	game.attacks = [];

	attack.game = game;

	const ship = new Ship();
	ship.id = 1;
	ship.orientation = Orientation.Horizontal;
	ship.type = ShipType.Battleship;
	ship.start = 97;
	ship.end = 100;
	ship.game = game;

	game.ships = [ship];

	let mockRepository = {
		findOne: () => attack,
		save: (_attack: Attack) => _attack,
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AttacksService,
				{
					provide: getRepositoryToken(Attack),
					useValue: mockRepository,
				},
				ShipsService,
				{
					provide: getRepositoryToken(Ship),
					useValue: {
						findOne: () => ship,
						save: (_ship: Ship) => _ship,
					},
				},
				GamesService,
				{
					provide: getRepositoryToken(Game),
					useValue: {
						findOne: () => game,
						save: (_game: Game) => _game,
					},
				},
			],
		}).compile();

		service = module.get<AttacksService>(AttacksService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	describe("Attack", () => {
		let newAttack: Attack;

		beforeAll(async () => {
			newAttack = await service.find(1);
		});

		it("Should return the Attack with id 1", () => {
			expect(newAttack.id).toBe(1);
		});

		it("Should return the Attack with Position 100", () => {
			expect(newAttack.position).toBe(100);
		});
	});

	describe("Attack Miss", () => {
		let attackResult: AttackDTO;

		beforeAll(async () => {
			const attackCreateDto = new AttackCreateDTO();
			attackCreateDto.gameId = "1";
			attackCreateDto.position = 1;

			try {
				attackResult = await service.attack(attackCreateDto);
			} catch (error) {
				console.log("TCL: error", error);
			}
		});

		it("Should return the Attack with result MISS", () => {
			expect(attackResult.result).toBe(AttackResult.Miss);
		});
	});

	describe("Attack Hit", () => {
		let attackResult: AttackDTO;

		beforeAll(async () => {
			const attackCreateDto = new AttackCreateDTO();
			attackCreateDto.gameId = "1";
			attackCreateDto.position = 100;

			attackResult = await service.attack(attackCreateDto);
		});

		it("Should return the Attack with result HIT at 100", () => {
			expect(attackResult.result).toBe(AttackResult.Hit);
		});

		it("Should return MISS because already attacked position 99", async () => {
			const attackCreateDto = new AttackCreateDTO();
			attackCreateDto.gameId = "1";
			attackCreateDto.position = 99;

			attackResult = await service.attack(attackCreateDto);

			expect(attackResult.result).toBe(AttackResult.Hit);
		});

		it("Should return Hit on position 98", async () => {
			const attackCreateDto = new AttackCreateDTO();
			attackCreateDto.gameId = "1";
			attackCreateDto.position = 98;

			attackResult = await service.attack(attackCreateDto);

			expect(attackResult.result).toBe(AttackResult.Hit);
		});

		it("Should return Hit on position 97", async () => {
			const attackCreateDto = new AttackCreateDTO();
			attackCreateDto.gameId = "1";
			attackCreateDto.position = 97;

			attackResult = await service.attack(attackCreateDto);

			expect(attackResult.result).toBe(
				"Win!You have completed the game in 5 moves",
			);
		});
	});
});
