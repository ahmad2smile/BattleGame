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
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GamesService,
				{
					provide: getRepositoryToken(Game),
					useValue: mockRepository,
				},
			],
		}).compile();

		gamesService = module.get<GamesService>(GamesService);
	});

	it("should be defined", () => {
		expect(gamesService).toBeDefined();
	});

	describe("Find Game", () => {
		it("Should return the Game with id 1", async () => {
			const newGame = await gamesService.find(game.id);
			expect(newGame.id).toBe("1");
		});

		it("Should return the Game with playerRole Attacker", async () => {
			const newGame = await gamesService.find(game.id);

			expect(newGame.playerRole).toBe(PlayerRole.Attacker);
		});
	});
});
