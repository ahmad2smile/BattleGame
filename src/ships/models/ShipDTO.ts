import { IsEnum, IsNotEmpty, IsInt, Min, Max } from "class-validator";

import { ShipType } from "./ShipType";
import { Orientation } from "./Orientation";

export class ShipDTO {
	@IsNotEmpty()
	gameId: string;

	@IsInt()
	@Min(1)
	@Max(100)
	start: number;

	@IsEnum(Orientation, { message: "Not a valid Orientation" })
	orientation: Orientation;

	@IsEnum(ShipType, { message: "Not a valid Ship Type" })
	type: ShipType;
}
