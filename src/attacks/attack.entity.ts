import { Ship } from "./../ships/ship.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Game } from "src/games/game.entity";
import { AttackResult } from "./models/AttackResult";

@Entity({ name: "attacks" })
export class Attack {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	position: number;

	@Column({
		type: "enum",
		enum: AttackResult,
		default: AttackResult.Miss,
	})
	result: AttackResult;

	@ManyToOne(
		type => Ship,
		ship => ship.attacks,
	)
	hitShip: Ship;

	@ManyToOne(
		type => Game,
		game => game.attacks,
	)
	game: Game;
}
