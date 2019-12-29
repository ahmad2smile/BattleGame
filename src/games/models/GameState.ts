import { Game } from "../game.entity";
import { GameStatus } from "./GameStatus";

export class GameState {
	constructor(game: Game) {
		this.id = game.id;

		const ships = game.ships || [];
		this.sunkShips = ships.filter(s => s.damage >= 100).length;

		this.gameStatus =
			this.sunkShips === 10 ? GameStatus.Won : GameStatus.InProgress;

		this.activeFleet = game.ships
			.filter(s => s.damage < 100)
			.map(s => s.type);
	}

	id: string;
	gameStatus: GameStatus;
	activeFleet: string[];
	sunkShips: number;
}
