import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { TeamService } from '../core/services/team.service';
import { PLAYERS } from 'src/mocks/players';
import { GenericGridComponentComponent } from '../shared/generic-grid-component/generic-grid-component.component';
import { CommonModule } from '@angular/common';

interface LeagueTeamRow {
  rank: number;
  logo: string;
  name: string;
  points: number;
}

@Component({
  selector: 'app-league-view',
  imports: [CommonModule, GenericGridComponentComponent],
  templateUrl: './league-view.component.html',
  styleUrl: './league-view.component.scss',
})
export class LeagueViewComponent implements OnInit {
  private teamService = inject(TeamService);
  leagueTeams = signal<LeagueTeamRow[]>([]);
  displayedColumns = ['rank', 'logoName', 'points'];

  ngOnInit(): void {
    this.teamService.loadTeams().subscribe((teams) => {
      // Aggregate points by teamId
      console.log(teams);
      const pointsByTeam: Record<string, number> = {};
      for (const player of PLAYERS) {
        const teamId = String(player.teamId);
        pointsByTeam[teamId] = (pointsByTeam[teamId] || 0) + player.points;
      }
      // Prepare rows
      const rows: LeagueTeamRow[] = teams.map((team) => ({
        name: team.name,
        logo: team.logo || `assets/team-logos/${team.id}.png`, // fallback logo
        points: pointsByTeam[team.id] || 0,
        rank: 0, // will be set after sorting
      }));
      // Sort and assign rank
      rows.sort((a, b) => b.points - a.points);
      rows.forEach((row, idx) => (row.rank = idx + 1));
      this.leagueTeams.set(rows);
    });
  }
}
