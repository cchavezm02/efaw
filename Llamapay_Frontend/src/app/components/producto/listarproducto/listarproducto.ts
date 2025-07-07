import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Producto } from '../../../models/productos';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Landing } from '../../landing/landing';
import { PpgsApiService } from '../../../services/ppgsapi.service';

@Component({
  selector: 'app-listarproducto',
  imports: [MatTableModule,
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule],
  templateUrl: './listarproducto.html',
  styleUrl: './listarproducto.css'
})
export class Listarproducto implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();
  constructor(private ps: ProductosService,
        private ppgsApi:PpgsApiService,
    
  ) { }

  ngOnInit(): void {
    this.ps.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ps.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number) {
    this.ps.deleteS(id).subscribe(data => {
      this.ps.list().subscribe(data => {
        this.ps.setList(data);
      });
    });
  }
  pagar(){
    this.ppgsApi.redirectToCheckout();
  }

}