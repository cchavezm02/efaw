import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaraplicacionesComponent } from './listaraplicaciones/listaraplicaciones.component';

@Component({
  selector: 'app-aplicaciones',
  imports: [RouterOutlet,ListaraplicacionesComponent],
  templateUrl: './aplicaciones.component.html',
  styleUrl: './aplicaciones.component.css'
})
export class AplicacionesComponent {
constructor(public route:ActivatedRoute){}
}
