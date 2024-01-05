import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TeamGridComponent } from './team-grid/team-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [

        BrowserModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatTableModule,
        TeamGridComponent,
        MatTabsModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
