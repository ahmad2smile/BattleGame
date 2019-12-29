import { IsEnum } from "class-validator";

import { PlayerRole } from "./PlayerRole";

export class GameCreateDTO {
	@IsEnum(PlayerRole, {
		message: "Player role can only be Attacker or Defender",
	})
	playerRole: PlayerRole;
}
