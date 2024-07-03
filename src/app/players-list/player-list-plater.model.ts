import { PlayerAvailability } from "../core/models/player-availability.enum";
import { Player } from "../core/models/player.model";

export interface PlayerListPlayer extends Player {
  name?: string;
  availability: PlayerAvailability;
}
