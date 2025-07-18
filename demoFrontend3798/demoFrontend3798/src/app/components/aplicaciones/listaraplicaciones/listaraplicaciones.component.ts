import { Component, OnInit } from '@angular/core';
import { Aplicacion } from '../../../models/aplicacion';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AplicacionService } from '../../../services/aplicacion.service';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listaraplicaciones',
  imports: [MatTableModule,CommonModule],
  templateUrl: './listaraplicaciones.component.html',
  styleUrl: './listaraplicaciones.component.css'
})
export class ListaraplicacionesComponent implements OnInit {
  
  dataSource: MatTableDataSource<Aplicacion> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
  ];

  constructor(private aS: AplicacionService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.aS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}