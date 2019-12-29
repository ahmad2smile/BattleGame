import { Ship } from "./../ships/ship.entity";
import { ShipsService } from "../ships/ships.service";
import { Test, TestingModule } from "@nestjs/testing";
import { GamesService } from "./games.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { PlayerRole } from "./models/PlayerRole";

describe("GamesService", () => {
	let gamesService: GamesService;

	const game = new Game();
	game.id = "1";
	game.playerRole = PlayerRole.Attacker;

	let mockRepository = {
		findOne: () => game,
		save: (_game: Game) => _game,
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GamesService,
				ShipsService,
				{
					provide: getRepositoryToken(Game),
					useValue: mockRepository,
				},
				{
					provide: getRepositoryToken(Ship),
					useValue: { findOne: () => new Ship() },
				},
			],
		}).compile();

		gamesService = module.get<GamesService>(GamesService);
	});

	it("should be defined", () => {
		expect(gamesService).toBeDefined();
	});

	let newGame: Game;

	beforeEach(async () => {
		newGame = await gamesService.find("1");
	});

	describe("Find Game", () => {
		it("Should return the Game with id 1", () => {
			expect(newGame.id).toBe("1");
		});

		it("Should return the Game with playerRole Attacker", () => {
			expect(newGame.playerRole).toBe(PlayerRole.Attacker);
		});
	});

	describe("Save Game", () => {
		it("Should return the Game with id 1", async () => {
			const savedGame = await gamesService.update(newGame);
			expect(savedGame.id).toBe("1");
		});

		it("Should return the Game with playerRole Attacker", async () => {
			const savedGame = await gamesService.update(newGame);

			expect(savedGame.playerRole).toBe(PlayerRole.Attacker);
		});
	});
});
