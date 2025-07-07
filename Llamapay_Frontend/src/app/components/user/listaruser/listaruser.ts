import { Component, OnInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listaruser',
  imports: [MatTableModule, CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  MatCardModule],
  templateUrl: './listaruser.html',
  styleUrl: './listaruser.css'
})
export class Listaruser implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7', 'c8'];
  constructor(private uS: UserService) { }

  detalleSeleccionado: User | null = null;


  verDetalle(element: User) {
    this.detalleSeleccionado = this.detalleSeleccionado === element ? null : element;
  }

  cerrarDetalle() {
    this.detalleSeleccionado = null;
  }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.uS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(userId: number) {
    this.uS.deleteS(userId).subscribe(data=>{
      this.uS.list().subscribe(data=>{
        this.uS.setList(data)
      })
    })
    this.uS.getList().subscribe(data => { //actualiza la lista cuando se inserta o actualiza la data
      this.dataSource = new MatTableDataSource(data)
    })
  } 
}