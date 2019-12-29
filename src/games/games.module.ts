import { Game } from "./game.entity";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShipsModule } from "src/ships/ships.module";

@Module({
	imports: [TypeOrmModule.forFeature([Game]), ShipsModule],
	controllers: [GamesController],
	providers: [GamesService],
})
export class GamesModule {}
