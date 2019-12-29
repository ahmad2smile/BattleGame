import { IsInt, Min, Max, IsNotEmpty } from "class-validator";

export class AttackCreateDTO {
	@IsNotEmpty()
	gameId: string;

	@IsInt()
	@Min(1)
	@Max(100)
	position: number;
}
