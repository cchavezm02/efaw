import { Component, OnInit } from '@angular/core';
import { RolService } from '../../../services/rol.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reportesroles',
  imports: [],
  templateUrl: './reportesroles.html',
  styleUrl: './reportesroles.css'
})
export class Reportesroles implements OnInit {
  tipoRol: string = '';
  selectedUserId: number = 0;
  usuarios: any[] = [];
  roles: any[] = [];

  constructor(private rolService: RolService, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.list().subscribe(data => {
      this.usuarios = data;
    });
  }

  buscarPorTipo(): void {
    if (this.tipoRol.trim() !== '') {
      this.rolService.obtenerPorTipoRol(this.tipoRol).subscribe(data => {
        this.roles = data;
      });
    }
  }

  buscarPorUsuario(): void {
    if (this.selectedUserId > 0) {
      this.rolService.obtenerPorUsuario(this.selectedUserId).subscribe(data => {
        this.roles = data;
      });
    }
  }
}
