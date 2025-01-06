import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TeamGridComponent } from './my-team/team-grid/team-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MAT_TABS_CONFIG, MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyTeamComponent } from './my-team/my-team.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent],
  providers: [
    { provide: MAT_TABS_CONFIG, useValue: { animationDuration: '500ms' } },
  ],
  bootstrap: [AppComponent],
  imports: [
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MyTeamComponent,
    PlayersListComponent,
    MainDashboardComponent,
    RouterModule.forRoot(routes),
  ],
})
export class AppModule {}
