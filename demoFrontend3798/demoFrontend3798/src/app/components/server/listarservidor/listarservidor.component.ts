import { Component, OnInit } from '@angular/core';
import { Server } from '../../../models/Server';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServerService } from '../../../services/server.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listarservidor',
  imports: [MatTableModule,CommonModule,RouterLink,MatIconModule,MatButtonModule],
  templateUrl: './listarservidor.component.html',
  styleUrl: './listarservidor.component.css',
})
export class ListarservidorComponent implements OnInit {
  dataSource: MatTableDataSource<Server> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7','c8','c9'];

  constructor(private sS: ServerService,    private snackBar: MatSnackBar
) {}
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
     this.sS.delete(id).subscribe({
      next: () => {
        // Si la eliminación tuvo éxito, refrescamos la lista
        this.sS.list().subscribe(data => {
          this.sS.setList(data);
          this.snackBar.open('Servidor eliminado correctamente.', 'Cerrar', { duration: 2000 });
        });
      },
      error: (err) => {
        // Aquí capturamos el error del backend
        // Suponemos que el backend devuelve 400 o 409 con un mensaje descriptivo
        const msg = err?.error?.message 
          || 'No se pudo eliminar: el servidor está asociado a una aplicación.';
        this.snackBar.open(msg, 'Cerrar', { duration: 4000, panelClass: ['snackbar-error'] });
      }
    });
  }
}