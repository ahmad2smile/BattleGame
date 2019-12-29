import { Ship } from "./../ships/ship.entity";
import { ShipsService } from "./../ships/ships.service";
import { GamesService } from "./../games/games.service";
import { Attack } from "./attack.entity";
import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Game } from "../games/game.entity";
import { AttackCreateDTO } from "./models/AttackCreateDTO";
import { AttackDTO } from "./models/AttackDTO";
import { AttackResult } from "./models/AttackResult";
import { Orientation } from "src/ships/models/Orientation";

@Injectable()
export class AttacksService {
	constructor(
		@InjectRepository(Attack)
		private readonly _attackRepository: Repository<Attack>,
		private readonly _gamesService: GamesService,
		private readonly _shipsService: ShipsService,
	) {}

	find(id: number): Promise<Attack> {
		return this._attackRepository.findOne(id);
	}

	async add(attackDto: AttackCreateDTO): Promise<AttackDTO> {
		const attack = new Attack();
		attack.position = attackDto.position;

		const game = await this._gamesService.find(attackDto.gameId);

		if (!game) {
			throw new NotFoundException("Game not found");
		}

		if (game.ships.every(s => s.damage >= 99)) {
			throw new BadRequestException("Game is over!");
		}

		const hitShip = this.getHitShip(attackDto.position, game);

		attack.hitShip = hitShip;
		attack.result = hitShip ? AttackResult.Hit : AttackResult.Miss;

		game.attacks.push(attack);

		await this._gamesService.update(game);

		let result: string = attack.result;

		if (hitShip && hitShip.damage >= 99) {
			result = `You just sank a ${hitShip.type}`;
		}

		if (game.ships.every(s => s.damage >= 99)) {
			result = `Win!You have completed the game in ${game.attacks.length} moves`;
		}

		return new AttackDTO(result);
	}

	private getHitShip(attackPosition: number, game: Game): Ship {
		const matchingPositionShip = game.ships.find(s =>
			this._shipsService.getShipCords(s).includes(attackPosition),
		);

		if (!matchingPositionShip) {
			return null;
		}

		const alreadySunkShip = matchingPositionShip.damage >= 99;
		const alreadyAttackedPosition = game.attacks.some(
			a => a.position === attackPosition,
		);

		if (alreadySunkShip || alreadyAttackedPosition) {
			return null;
		}

		return this.addAttackDamage(matchingPositionShip);
	}

	private addAttackDamage(ship: Ship): Ship {
		let shipLength = 1;

		if (ship.orientation === Orientation.Horizontal) {
			shipLength = ship.end - ship.start + 1; // Include end side too
		} else {
			shipLength = (ship.end - ship.start) / 10 + 1; // Include end side too
		}

		ship.damage += Math.ceil(100 / shipLength);

		return ship;
	}
}
