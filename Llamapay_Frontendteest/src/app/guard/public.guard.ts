import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); // ✅ redirige a home si ya está logueado
      return false; // ❌ no deja entrar a login/registro si ya tienes sesión
    }
    return true; // ✅ permite acceder si NO estás logueado
  }
}