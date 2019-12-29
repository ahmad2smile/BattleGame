import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Ship } from "./ship.entity";
import { Repository } from "typeorm";
import { ShipLength } from "./models/ShipLength";
import { Orientation } from "./models/Orientation";
import { ShipType } from "./models/ShipType";
import { getRandomNumber } from "../utils/getRandomNumber";
import { MaxShips } from "./models/MaxShips";

@Injectable()
export class ShipsService {
	constructor(
		@InjectRepository(Ship)
		private readonly shipRepository: Repository<Ship>,
	) {}

	async find(id: number): Promise<Ship> {
		const ship = await this.shipRepository.findOne(id);

		if (!ship) {
			throw new NotFoundException("Ship not found");
		}

		return ship;
	}

	add(ship: Ship): Promise<Ship> {
		return this.shipRepository.save(ship);
	}

	getRandomShips() {
		const battleShip = this.getRandomBattleship();

		const cruiser1 = this.getRandomCruiser();
		const cruiser2 = this.getRandomCruiser();

		const destroyer1 = this.getRandomDestroyer();
		const destroyer2 = this.getRandomDestroyer();
		const destroyer3 = this.getRandomDestroyer();

		const submarine1 = this.getRandomSubmarine();
		const submarine2 = this.getRandomSubmarine();
		const submarine3 = this.getRandomSubmarine();
		const submarine4 = this.getRandomSubmarine();

		return this.placeRandomShips([
			battleShip,
			cruiser1,
			cruiser2,
			destroyer1,
			destroyer2,
			destroyer3,
			submarine1,
			submarine2,
			submarine3,
			submarine4,
		]);
	}

	getShipCords(ship: Ship): number[] {
		const length = ShipLength[ship.type];

		return Array.from({ length }, (_, i) => {
			if (ship.orientation === Orientation.Horizontal) {
				return ship.start + i;
			}

			return ship.start + 10 * i;
		});
	}

	placeDefenderShip(ship: Ship, gameShips: Ship[]): Ship {
		const shipCords = this.getShipCords(ship);

		const existingShips = gameShips.filter(s => s.type === ship.type);

		if (existingShips.length === MaxShips[ship.type]) {
			throw new BadRequestException(
				`Game can only have ${MaxShips[ship.type]} ${ship.type}`,
			);
		}

		if (!this.isValidPosition(gameShips, -1, shipCords)) {
			throw new BadRequestException(
				`Invalid start position for ${ship.type}`,
			);
		}

		ship.end = shipCords.pop();
		ship.damage = 0;
		ship.attacks = [];

		return ship;
	}

	private placeRandomShips(ships: Ship[]): Ship[] {
		for (let i = 0; i < ships.length; i++) {
			const ship = ships[i];

			ship.start = getRandomNumber();
			let shipCords = this.getShipCords(ship);
			let isValid = this.isValidPosition(ships, i, shipCords);

			while (!isValid) {
				ship.start = getRandomNumber();
				shipCords = this.getShipCords(ship);

				isValid = this.isValidPosition(ships, i, shipCords);
			}

			ship.end = shipCords.pop();
		}

		return ships;
	}

	private isValidPosition(
		ships: Ship[],
		index: number,
		shipCords: number[],
	): boolean {
		// if any of current ship's coordinates `shipCords` are same as any other ship's
		// safe area coordinates
		return (
			!ships
				.filter((v, i) => i !== index)
				.some(s =>
					shipCords.some(c =>
						this.getSafeCordsAroundShip(s).includes(c),
					),
				) && shipCords.every(c => c > 0 && c < 101)
		);
	}

	private getSafeCordsAroundShip(ship: Ship): number[] {
		const cords = this.getShipCords(ship);
		const safeCords = [];

		cords.forEach(c => {
			safeCords.push(c - 1, c + 1, c - 10, c + 10); // back tile, next tile, down tile, up tile
		});

		return [...cords, ...safeCords]; // just need to check if new ship start on any of these cords
	}

	private getRandomBattleship(): Ship {
		const battleShip = new Ship();
		battleShip.type = ShipType.Battleship;
		battleShip.damage = 0;
		battleShip.orientation =
			getRandomNumber() > 50
				? Orientation.Horizontal
				: Orientation.Vertical;
		return battleShip;
	}

	private getRandomCruiser(): Ship {
		const cruiser = new Ship();
		cruiser.type = ShipType.Cruiser;
		cruiser.damage = 0;
		cruiser.orientation =
			getRandomNumber() > 50
				? Orientation.Horizontal
				: Orientation.Vertical;
		return cruiser;
	}

	private getRandomDestroyer(): Ship {
		const destroyer = new Ship();
		destroyer.type = ShipType.Destroyer;
		destroyer.damage = 0;
		destroyer.orientation =
			getRandomNumber() > 50
				? Orientation.Horizontal
				: Orientation.Vertical;
		return destroyer;
	}

	private getRandomSubmarine(): Ship {
		const submarine = new Ship();
		submarine.type = ShipType.Submarine;
		submarine.damage = 0;
		submarine.orientation =
			getRandomNumber() > 50
				? Orientation.Horizontal
				: Orientation.Vertical;
		return submarine;
	}
}
