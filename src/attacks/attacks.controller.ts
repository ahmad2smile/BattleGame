import {
	Controller,
	Get,
	Query,
	Post,
	Body,
	Res,
	HttpStatus,
} from "@nestjs/common";
import { AttacksService } from "./attacks.service";
import { Attack } from "./attack.entity";
import { AttackCreateDTO } from "./models/AttackCreateDTO";
import { Response } from "express";

@Controller("attacks")
export class AttacksController {
	constructor(private readonly _attacksService: AttacksService) {}

	@Get()
	getAttack(@Query() id: number): Promise<Attack> {
		return this._attacksService.find(id);
	}

	@Post()
	async createNewAttack(
		@Res()
		response: Response,
		@Body()
		attackDto: AttackCreateDTO,
	) {
		await this._attacksService.add(attackDto, response);
	}
}
