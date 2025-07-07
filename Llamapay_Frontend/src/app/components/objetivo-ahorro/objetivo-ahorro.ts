import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarobjetivoahorro } from './listarobjetivoahorro/listarobjetivoahorro';

@Component({
  selector: 'app-objetivo-ahorro',
  imports: [RouterOutlet, Listarobjetivoahorro],
  templateUrl: './objetivo-ahorro.html',
  styleUrl: './objetivo-ahorro.css'
})
export class ObjetivoAhorro {
constructor(public route: ActivatedRoute) { }
}
