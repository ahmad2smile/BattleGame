import { ShipDTO } from "./../ships/models/ShipDTO";
import { GamesService } from "./games.service";
import { GameCreateDTO } from "./models/GameCreateDTO";
import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { GameState } from "./models/GameState";

@Controller("games")
export class GamesController {
	constructor(private readonly _gamesService: GamesService) {}

	@Get()
	get(@Query() id: string): Promise<GameState> {
		return this._gamesService.state(id);
	}

	@Post()
	async createNewGame(@Body() gameDto: GameCreateDTO): Promise<GameState> {
		const game = await this._gamesService.add(gameDto.playerRole);

		return new GameState(game);
	}

	@Post("/place-ship")
	async placeShip(@Body() shipDto: ShipDTO): Promise<GameState> {
		const game = await this._gamesService.addShip(shipDto);

		return new GameState(game);
	}
}
