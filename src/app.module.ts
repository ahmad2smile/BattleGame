import { GamesModule } from "./games/games.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [TypeOrmModule.forRoot(), GamesModule],
})
export class AppModule {}
