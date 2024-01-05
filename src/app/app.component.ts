import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly formations = [
    'Vert Stack',
    'Horizontal Stack',
    'Hex'
  ]
  formation = new FormControl('Vert Stack', Validators.required);;
  title = 'fantasy-ultimate-front';
}
