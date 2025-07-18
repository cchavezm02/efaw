import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TiendaService } from '../../../services/tienda.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tienda } from '../../../models/tienda';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscar',
  imports: [MatTableModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './buscar.html',
  styleUrl: './buscar.css'
})
export class Buscar implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'direccion'];
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource();
  form: FormGroup;
  mensaje: string = ""
  notResults: boolean = false

  tiendaBusqueda: string = ""

  constructor(private tS: TiendaService, private fB: FormBuilder) {
    this.form = this.fB.group({
      nombret: ['']
    });
  }

  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.form.get('nombret')?.valueChanges.subscribe(value => {
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