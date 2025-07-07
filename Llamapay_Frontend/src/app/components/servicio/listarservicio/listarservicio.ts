import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';

import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-listarservicio',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './listarservicio.html',
  styleUrl: './listarservicio.css',
})
export class Listarservicio implements OnInit {
  dataSource: MatTableDataSource<Servicio> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];

  constructor(private sS: ServicioService) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data) => {
      //actualiza la lista de servicios cuando se inserta o actualiza un servicio
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.sS.deleteS(id).subscribe(() => {
      this.sS.list().subscribe((data) => {
        //actualiza la lista de servicios
        this.sS.setList(data);
      });
    });
  }
}