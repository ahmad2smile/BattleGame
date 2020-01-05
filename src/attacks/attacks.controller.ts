import { Controller, Get, Query, Post, Body, HttpStatus } from "@nestjs/common";
import { AttacksService } from "./attacks.service";
import { Attack } from "./attack.entity";
import { AttackCreateDTO } from "./models/AttackCreateDTO";
import { AttackDTO } from "./models/AttackDTO";

@Controller("attacks")
export class AttacksController {
	constructor(private readonly _attacksService: AttacksService) {}

	@Get()
	getAttack(@Query() id: number): Promise<Attack> {
		return this._attacksService.find(id);
	}

	@Post()
	async createNewAttack(
		@Body()
		attackDto: AttackCreateDTO,
	): Promise<AttackDTO> {
		return this._attacksService.attack(attackDto);
	}
}
