import { Injectable } from '@angular/core';
import { Position } from '../models/formation.enum';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class FantasyPointsService {
  // Points multipliers based on position
  private readonly POINTS_MULTIPLIERS = {
    [Position.Handler]: 1.0, // Base multiplier for handlers
    [Position.Cutter]: 1.5, // Cutters get 50% more points for goals
    [Position.Flex]: 1.25, // Flex players get 25% more points for goals
  };

  // Assists multipliers based on position
  private readonly ASSISTS_MULTIPLIERS = {
    [Position.Handler]: 1.5, // Handlers get 50% more points for assists
    [Position.Cutter]: 1.0, // Base multiplier for cutters
    [Position.Flex]: 1.25, // Flex players get 25% more points for assists
  };

  calculateFantasyPoints(player: Player & { position?: Position }): number {
    if (!player.position) {
      return 0;
    }

    const pointsValue =
      player.points * this.POINTS_MULTIPLIERS[player.position];
    const assistsValue =
      player.assists * this.ASSISTS_MULTIPLIERS[player.position];

    return Math.round((pointsValue + assistsValue) * 10) / 10; // Round to 1 decimal place
  }

  getPointsMultiplier(position: Position): number {
    return this.POINTS_MULTIPLIERS[position];
  }

  getAssistsMultiplier(position: Position): number {
    return this.ASSISTS_MULTIPLIERS[position];
  }
}
