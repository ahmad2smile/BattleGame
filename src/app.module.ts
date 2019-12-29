import { GamesModule } from "./games/games.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShipsModule } from './ships/ships.module';
import { AttacksModule } from './attacks/attacks.module';

@Module({
	imports: [TypeOrmModule.forRoot(), GamesModule, ShipsModule, AttacksModule],
})
export class AppModule {}
