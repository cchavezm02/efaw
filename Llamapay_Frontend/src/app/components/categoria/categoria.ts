import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarcategoria } from './listarcategoria/listarcategoria';

@Component({
  selector: 'app-categoria',
  imports: [
    RouterOutlet,
    Listarcategoria
  ],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria {
  constructor(public route:ActivatedRoute) { 
  }
}
