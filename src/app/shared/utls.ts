import { Player } from "../core/models/player.model";
import { MyTeamPlayer } from "../my-team/my-team-player.model";

export const playerFullNameToShortVersion = (player: Player): MyTeamPlayer => ({ ...player, name: `${player.firstName[0]}.${player.lastName}` })
