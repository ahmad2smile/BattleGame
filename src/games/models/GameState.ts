import { Game } from "../game.entity";
import { GameStatus } from "./GameStatus";

export class GameState {
	constructor(game: Game) {
		this.id = game.id;

		this.gameStatus = GameStatus.InProgress;
	}

	id: string;
	gameStatus: GameStatus;
}
