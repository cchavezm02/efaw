import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-perfil',
  imports: [CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {
  form: FormGroup = new FormGroup({});
  user: User = new User();

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userId: [''],
      nameUser: ['', Validators.required],
      lastnameUser: ['', Validators.required],
      emailUser: ['', Validators.required],
      birthdayUser: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [true]
    });

    const username = this.loginService.getUsername();
    if (username) {
      this.userService.findByUsername(username).subscribe((data) => {
        this.user = data;
        this.setFormValues(this.user);
      });
    }
  }

  setFormValues(user: User) {
    this.form.setValue({
      userId: user.userId,
      nameUser: user.nameUser,
      lastnameUser: user.lastnameUser,
      emailUser: user.emailUser,
      birthdayUser: user.birthdayUser,
      username: user.username,
      password: user.password,
      enabled: user.enabled
    });
  }

  actualizarPerfil() {
    if (this.form.valid) {
      const usuarioActualizado: User = this.form.value;
      this.userService.update(usuarioActualizado).subscribe(() => {
        alert('Datos actualizados correctamente');
        this.router.navigate(['/home']);
      });
    }
  }

  eliminarCuenta() {
    const confirmacion = confirm('¿Deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmacion) {
      this.userService.deleteS(this.user.userId).subscribe(() => {
        this.loginService.cerrarSesion();
        this.router.navigate(['/']);
      });
    }
  }
}
