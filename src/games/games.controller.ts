import { Game } from "./game.entity";
import { GamesService } from "./games.service";
import { GameCreateDTO } from "./models/GameCreateDTO";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GameState } from "./models/GameState";

@Controller("games")
export class GamesController {
	constructor(private readonly _gamesService: GamesService) {}

	@Get()
	get(@Query() id: string): Promise<Game> {
		return this._gamesService.find(id);
	}

	@Post()
	async createNewGame(@Body() gameDto: GameCreateDTO): Promise<GameState> {
		const game = await this._gamesService.add(gameDto.playerRole);

		return new GameState(game);
	}
}
