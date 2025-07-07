import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TiendaService } from '../../../services/tienda.service';
import { Tienda } from '../../../models/tienda';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscartienda',
  imports: [MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './buscartienda.html',
  styleUrl: './buscartienda.css'
})
export class Buscartienda implements OnInit   {
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource()
  displayedColumns: string[] = ['c1', 'c2', 'c3']
  form: FormGroup;

  mensaje: string = ""
  notResults: boolean = false

  tiendaBusqueda: string = ""

  constructor(
    private tS: TiendaService,
    private fb: FormBuilder) {
    this.form = fb.group({
      tienda: ['']
    })
  }

  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.form.get('tienda')?.valueChanges.subscribe(value => {
      this.tiendaBusqueda = value
      this.buscar()
    })
  }

  buscar() {
    if (this.tiendaBusqueda.trim()) {
      this.tS.searchTienda(this.tiendaBusqueda).subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.notResults = data.length === 0
      })
    } else {
      this.tS.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data)
        this.notResults = false
      })
    }

  }
}
