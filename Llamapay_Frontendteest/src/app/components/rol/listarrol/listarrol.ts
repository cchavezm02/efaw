import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RolService } from '../../../services/rol.service';
import { Rol } from '../../../models/rol';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarrol',
  imports: [
     MatTableModule,
    CommonModule,
    MatIconModule, 
  ],
  templateUrl: './listarrol.html',
  styleUrl: './listarrol.css'
})
export class Listarrol implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private rS: RolService) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.rS.setList(data); // alimenta el observable
    });

    this.rS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
  const confirmacion = confirm("¿Estás seguro de eliminar este rol?");
  if (confirmacion) {
    this.rS.eliminarRol(id).subscribe(() => {
      this.rS.list().subscribe(data => {
        this.rS.setList(data);
      });
    });
  }
}
}