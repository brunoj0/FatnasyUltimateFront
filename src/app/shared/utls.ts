import { PlayerAvailability } from "../core/models/player-availability.enum";
import { Player } from "../core/models/player.model";
import { MyTeamPlayer } from "../my-team/my-team-player.model";
import { PlayerListPlayer } from "../players-list/player-list-plater.model";

export const playerFullNameToShortVersion = (player: Player): MyTeamPlayer => ({ ...player, name: `${player.firstName[0]}.${player.lastName}` })

export const addPlayerAvailability = (player: Player, userTeamId: number): PlayerListPlayer => ({ ...player,
  availability: player.teamId !== null ? (userTeamId === player.teamId ? PlayerAvailability.SAME_TEAM : PlayerAvailability.TRANSFER): PlayerAvailability.AVAILABLE})
