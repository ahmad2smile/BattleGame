import { ShipsModule } from "./../ships/ships.module";
import { Attack } from "./attack.entity";
import { Module } from "@nestjs/common";
import { AttacksService } from "./attacks.service";
import { AttacksController } from "./attacks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesModule } from "src/games/games.module";

@Module({
	imports: [TypeOrmModule.forFeature([Attack]), GamesModule, ShipsModule],
	providers: [AttacksService],
	controllers: [AttacksController],
})
export class AttacksModule {}
