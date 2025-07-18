import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarservidorComponent } from './listarservidor/listarservidor.component';

@Component({
  selector: 'app-server',
  imports: [RouterOutlet,ListarservidorComponent],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent {
constructor( public route:ActivatedRoute){}
}
