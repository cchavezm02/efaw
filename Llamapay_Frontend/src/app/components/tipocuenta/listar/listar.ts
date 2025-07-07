import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TipoCuenta } from '../../../models/tipocuenta';
import { TipoCuentaService } from '../../../services/tipocuenta.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-tipocuenta',
  templateUrl: './listar.html',
  styleUrls: ['./listar.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ]
})
export class ListarTipoCuentaComponent implements OnInit {
  lista: TipoCuenta[] = [];

  constructor(
    private tipoCuentaService: TipoCuentaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Carga inicial
    this.tipoCuentaService.list().subscribe(data => {
      this.tipoCuentaService.setList(data);
    });

    // Escucha los cambios en la lista (se actualiza tras eliminar)
    this.tipoCuentaService.getList().subscribe(data => {
      this.lista = data;
    });
  }

  editar(id: number) {
    this.router.navigate(['/tipocuenta/insertar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este tipo de cuenta?')) {
      this.tipoCuentaService.delete(id).subscribe(() => {
        // Filtra localmente la lista y actualiza
        this.lista = this.lista.filter(t => t.idTipoCuenta !== id);
        // También actualiza el BehaviorSubject si otros componentes lo usan
        this.tipoCuentaService.setList(this.lista);
      });
    }
  }

  verDetalle(tipoCuenta: TipoCuenta) {
    alert(`Detalle:\nNombre: ${tipoCuenta.nombreTipoCuenta}\nNúmero: ${tipoCuenta.numeroTipoCuenta}\nTipo: ${tipoCuenta.tipodeCuenta}`);
  }
}