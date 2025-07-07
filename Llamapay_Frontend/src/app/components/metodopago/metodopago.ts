import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarmetodopago } from './listarmetodopago/listarmetodopago';

@Component({
  selector: 'app-metodopago',
  imports: [
    RouterOutlet,
    Listarmetodopago
  ],
  templateUrl: './metodopago.html',
  styleUrl: './metodopago.css'
})
export class MetodoPago {
  constructor(public route:ActivatedRoute) { 
  }
}