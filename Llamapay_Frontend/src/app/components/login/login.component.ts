import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { JwtRequest } from '../../models/jwtRequest'; 
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
    username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

    login(): void {
    const request: JwtRequest = {
      username: this.username,
      password: this.password
    };

    console.log('Enviando login:', request); // verifica lo enviado

    this.loginService.login(request).subscribe({
      next: (response) => {
        this.loginService.guardarSesion(response, this.username);
        this.router.navigate(['/home']);
      },
      error: (err) => {
      console.error('ERROR DETECTADO EN LOGIN:', err); // muy importante
      alert('Credenciales inválidas. Intente nuevamente.');
      }
    });
  }
}