import { Module } from "@nestjs/common";
import { ShipsService } from "./ships.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ship } from "./ship.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Ship])],
	providers: [ShipsService],
	exports: [ShipsService],
})
export class ShipsModule {}
