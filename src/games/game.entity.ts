import { Attack } from "./../attacks/attack.entity";
import { Ship } from "./../ships/ship.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PlayerRole } from "./models/PlayerRole";

@Entity({ name: "games" })
export class Game {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({
		type: "enum",
		enum: PlayerRole,
		default: PlayerRole.Attacker,
	})
	playerRole: PlayerRole;

	@OneToMany(
		type => Ship,
		ship => ship.game,
		{ cascade: true },
	)
	ships: Ship[];

	@OneToMany(
		type => Attack,
		ship => ship.game,
		{ cascade: true },
	)
	attacks: Attack[];
}
