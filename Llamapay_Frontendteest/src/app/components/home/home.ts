import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  ppgsApi: any;
  mostrarBotones(): boolean {
    return false; // Nunca mostrar ingresar/registrarse aquí
  }

  pagar(){
    this.ppgsApi.redirectToCheckout();
  }
}