import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Game } from "../games/game.entity";
import { Orientation } from "./models/Orientation";
import { ShipType } from "src/games/models/ShipType";

@Entity({ name: "ships" })
export class Ship {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	start: number;

	@Column()
	end: number;

	@Column({
		type: "enum",
		enum: Orientation,
		default: Orientation.Horizontal,
	})
	orientation: Orientation;

	@Column()
	damage: number;

	@Column({
		type: "enum",
		enum: ShipType,
		default: ShipType.Battleship,
	})
	type: ShipType;

	@ManyToOne(
		type => Game,
		game => game.ships,
	)
	game: Game;
}
