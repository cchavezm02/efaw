import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { Transaccion } from '../../../models/transaccion';
import { TransaccionService } from '../../../services/transaccion.service';

@Component({
  selector: 'app-listar-transaccion',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class ListarTransaccion implements OnInit {
  transacciones: Transaccion[] = [];

  constructor(private tS: TransaccionService) {}

ngOnInit(): void {
  this.tS.getList().subscribe((data: Transaccion[]) => {
    this.transacciones = data;
  });
}


  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta transacción?')) {
      this.tS.delete(id).subscribe(() => {
        this.tS.list().subscribe((data: Transaccion[]) => {
          this.tS.setList(data);
          this.transacciones = data;
        });
      });
    }
  }

  verDetalle(element: Transaccion): void {
    alert(`Fecha: ${new Date(element.fechaTransaccion).toLocaleDateString()}
Monto: S/. ${element.montoTransaccion}
Descripción: ${element.descripcionTransaccion}
Tipo: ${element.tipotransaccion.descripcion}`);
  }
}