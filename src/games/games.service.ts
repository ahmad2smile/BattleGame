import { Game } from "./game.entity";
import { PlayerRole } from "./models/PlayerRole";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Game)
		private readonly _gameRepository: Repository<Game>,
	) {}

	find(id: string): Promise<Game> {
		return this._gameRepository.findOne(id);
	}

	add(playerRole: PlayerRole): Promise<Game> {
		const game = new Game();
		game.playerRole = playerRole;

		return this._gameRepository.save(game);
	}

	update(game: Game): Promise<Game> {
		return this._gameRepository.save(game);
	}
}
