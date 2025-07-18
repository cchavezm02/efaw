import { Component, OnInit } from '@angular/core';
import { TipoTransaccionService } from '../../../services/tipotransaccion.service';
import { TipoTransaccion } from '../../../models/tipotransaccion';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listar-tipotransaccion',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class ListarTipoTransaccionComponent implements OnInit {
  lista: TipoTransaccion[] = [];

  constructor(
    private tipoService: TipoTransaccionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cargar la data inicial una sola vez
    this.tipoService.list().subscribe((data: TipoTransaccion[]) => {
      this.tipoService.setList(data);
    });

    // Escuchar cambios en tiempo real desde el Subject
    this.tipoService.getList().subscribe((data: TipoTransaccion[]) => {
      this.lista = data;
    });
  }

  editar(id: number): void {
    this.router.navigate(['/tipotransaccion/insertar', id]); 
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar este tipo de transacción?')) {
      this.tipoService.delete(id).subscribe(() => {
        this.tipoService.list().subscribe((data: TipoTransaccion[]) => {
          this.tipoService.setList(data);
        });
      });
    }
  }
}