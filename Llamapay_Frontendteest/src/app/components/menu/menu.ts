import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  role: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  verificar(): boolean {
    return this.loginService.verificar();
  }

  esAdmin(): boolean {
    return this.loginService.esAdmin();
  }

  esCliente(): boolean {
    return this.loginService.esCliente();
  }

  esTester(): boolean {
    return this.loginService.esTester();
  }

  getRole(): string {
    return this.loginService.getUserRole();
  }

  getUsername(): string | null {
    return this.loginService.getUsername();
  }

  cerrar(): void {
    this.loginService.cerrarSesion();
    this.router.navigate(['/login']);
  }
}