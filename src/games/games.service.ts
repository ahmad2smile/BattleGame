import { Ship } from "./../ships/ship.entity";
import { ShipDTO } from "./../ships/models/ShipDTO";
import { Game } from "./game.entity";
import { PlayerRole } from "./models/PlayerRole";
import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShipsService } from "../ships/ships.service";
import { GameState } from "./models/GameState";

@Injectable()
export class GamesService {
	constructor(
		@InjectRepository(Game)
		private readonly _gameRepository: Repository<Game>,
		private readonly _shipsService: ShipsService,
	) {}

	async find(id: string): Promise<Game> {
		const game = await this._gameRepository.findOne(id, {
			relations: ["ships", "attacks"],
		});

		if (!game) {
			throw new NotFoundException("Game not found");
		}

		return game;
	}

	async state(id: string): Promise<GameState> {
		const game = await this.find(id);

		return new GameState(game);
	}

	add(playerRole: PlayerRole): Promise<Game> {
		const game = new Game();
		game.playerRole = playerRole;

		if (playerRole === PlayerRole.Defender) {
			game.ships = [];
		} else {
			game.ships = this._shipsService.getRandomShips();
		}

		return this._gameRepository.save(game);
	}

	async addShip(shipDto: ShipDTO): Promise<Game> {
		const game = await this.find(shipDto.gameId);

		if (game.playerRole === PlayerRole.Attacker) {
			throw new BadRequestException(
				"Can not place ship on a Attacker Role Game",
			);
		}

		const ship = new Ship();
		ship.type = shipDto.type;
		ship.orientation = shipDto.orientation;
		ship.start = shipDto.start;
		ship.game = game;

		const placedShip = this._shipsService.placeDefenderShip(
			ship,
			game.ships,
		);

		game.ships.push(placedShip);

		return this.update(game);
	}

	update(game: Game): Promise<Game> {
		return this._gameRepository.save(game);
	}
}
