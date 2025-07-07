import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportesuserComponent } from './reportesuser/reportesuser';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet, ReportesuserComponent],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportes {
  constructor(public route: ActivatedRoute){}

}
