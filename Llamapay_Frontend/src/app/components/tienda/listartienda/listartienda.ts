import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TiendaService } from '../../../services/tienda.service';
import { Tienda } from '../../../models/tienda';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listartienda',
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './listartienda.html',
  styleUrl: './listartienda.css'
})
export class Listartienda implements OnInit {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();
  tiendas: Tienda[] = [];
  constructor(private tS: TiendaService) { }
  
  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.tiendas = data;
    });
    this.tS.getList().subscribe(data => { 
      this.dataSource = new MatTableDataSource(data);
      this.tiendas = data;
    });
  }
  
  eliminar(id: number) {
    this.tS.deleteS(id).subscribe(data => {
      this.tS.list().subscribe(data => {
        this.tS.setList(data);
      });
    });
  }

}