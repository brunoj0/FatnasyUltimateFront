import { Component, computed, inject } from '@angular/core';
import { PLAYERS } from 'src/mocks/players';
import { GenericGridComponentComponent } from '../shared/generic-grid-component/generic-grid-component.component';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Player } from '../core/models/player.model';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { LeagueStore } from '../core/league.store';
import {
  addPlayerAvailability,
  playerFullNameToShortVersion,
} from '../shared/utls';
import { CommonModule } from '@angular/common';
import { shareReplay, switchMap, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { MyTeamPlayer } from '../my-team/my-team-player.model';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from './add-player-dialog/add-player-dialog.component';
import { Formation, Position } from '../core/models/formation.enum';
import { PlayerStore } from '../core/player.store';

interface PlayerWithAvailability extends Player {
  availability: 'SAME_TEAM' | 'TRANSFER' | 'AVAILABLE';
}

@Component({
  selector: 'app-players-list',
  imports: [
    GenericGridComponentComponent,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './players-list.component.html',
  styleUrl: './players-list.component.scss',
})
export class PlayersListComponent {
  readonly displayedColumns = ['availability', 'name', 'assists', 'points'];

  playerSearch = new FormControl('', { nonNullable: true });
  readonly store = inject(LeagueStore);
  private playerStore = inject(PlayerStore);
  private dialog = inject(MatDialog);

  players = toObservable(this.store.playerWithAvailability).pipe(
    switchMap((players) =>
      this.playerSearch.valueChanges.pipe(
        map((searchTerm: string) => {
          if (searchTerm === '') {
            return players;
          }
          return players.filter((player: any) =>
            playerFullNameToShortVersion(player)
              .name.toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        }),
        startWith(players),
        map((players: Player[]) => players.map(playerFullNameToShortVersion)),
        tap((data) => console.log(data))
      )
    )
  );

  onPlayerSelected(player: Player) {
    // Don't open dialog for players already on the team
    if ((player as any).availability === 'SAME_TEAM') {
      return;
    }

    const dialogRef = this.dialog.open(AddPlayerDialogComponent, {
      data: {
        player,
        availablePositions: [Position.Handler, Position.Cutter, Position.Flex],
        existingPlayers: this.store.userTeamPlayers(),
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      if (result.type === 'add') {
        // Transfer player to user's team
        this.playerStore.transferPlayer({
          playerId: result.player.id,
          newTeamId: this.store.userTeamId(),
        });
      } else if (result.type === 'swap') {
        // Swap players in the formation
        this.store.swapPlayers(result.newPlayer.id, result.existingPlayer.id);
      }
    });
  }
}
