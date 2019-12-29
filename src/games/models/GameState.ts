import { Game } from "../game.entity";
import { GameStatus } from "./GameStatus";

export class GameState {
	constructor(game: Game) {
		this.id = game.id;

		this.gameStatus = (game.ships || []).every(s => s.damage === 100)
			? GameStatus.Won
			: GameStatus.InProgress;
	}

	id: string;
	gameStatus: GameStatus;
}
