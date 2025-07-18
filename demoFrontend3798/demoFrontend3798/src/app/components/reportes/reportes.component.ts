import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Reporte01Component } from './reporte01/reporte01.component';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet,Reporte01Component],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
constructor(public route:ActivatedRoute){}
}
