// src/app/app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root', // Debe coincidir con el selector en index.html
  templateUrl: './app.component.html', // Ruta correcta al archivo de plantilla
  styleUrls: ['./app.component.css'], // Ruta correcta al archivo de estilos
  standalone: false
})
export class AppComponent {
  title = 'frontend-angular';
}
