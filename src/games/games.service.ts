import { Game } from "./game.entity";
import { PlayerRole } from "./models/PlayerRole";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShipsService } from "src/ships/ships.service";

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Game)
		private readonly _gameRepository: Repository<Game>,
		private readonly _shipsService: ShipsService,
	) {}

	find(id: string): Promise<Game> {
		return this._gameRepository.findOne(id, {
			relations: ["ships"],
		});
	}

	add(playerRole: PlayerRole): Promise<Game> {
		const game = new Game();
		game.playerRole = playerRole;

		if (playerRole === PlayerRole.Defender) {
			game.ships = null;
		} else {
			game.ships = this._shipsService.getRandomShips();
		}

		return this._gameRepository.save(game);
	}

	update(game: Game): Promise<Game> {
		return this._gameRepository.save(game);
	}
}
