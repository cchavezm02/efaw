import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarservicio } from './listarservicio/listarservicio';

@Component({
  selector: 'app-servicio',
  imports: [
    RouterOutlet,
    Listarservicio
  ],
  templateUrl: './servicio.html',
  styleUrl: './servicio.css'
})
export class Servicio {
  constructor(public route: ActivatedRoute) { 
    // Aquí puedes inicializar cualquier cosa que necesites
  }
}
