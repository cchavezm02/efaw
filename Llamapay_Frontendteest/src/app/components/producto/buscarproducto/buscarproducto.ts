import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductosService } from '../../../services/productos.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../models/productos';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscarproducto',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './buscarproducto.html',
  styleUrl: './buscarproducto.css'
})
export class Buscarproducto implements OnInit {
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  form: FormGroup;
  mensaje: string = "";
  notResults: boolean = false;
  productoBusqueda: string = "";

  constructor(private pS: ProductosService, private fb: FormBuilder) {
    this.form = fb.group({
      producto: ['']
    });
  }

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.form.get('producto')?.valueChanges.subscribe(value => {
      this.productoBusqueda = value;
      this.buscar();
    });
  }

  buscar() {
    if (this.productoBusqueda.trim()) {
      this.pS.searchProducto(this.productoBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = data.length === 0;
      });
    } else {
      this.pS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.notResults = false;
      });
    }
  }

}
