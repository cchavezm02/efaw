import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServerService } from '../../../services/server.service';
import { Server } from '../../../models/Server';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-busqueda',
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule
],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
  dataSource: MatTableDataSource<Server> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  
  nombrebusqueda: string = "";
  mensaje: string = "";  
  form: FormGroup; 
  noResults: boolean = false; 

  constructor(private sS: ServerService, private fb: FormBuilder) {

    this.form = this.fb.group({
      nombrebusqueda: [''],
    });

  }
  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
      this.form.get('nombrebusqueda')?.valueChanges.subscribe((value) => {
      this.nombrebusqueda = value; // Actualiza el valor
      this.buscar(); // Llama al método de búsqueda
    });
  }
  
  buscar() {
    // Obtener el valor actual del campo de búsqueda
    if (this.nombrebusqueda.trim()) {
      this.sS.searchProvider(this.nombrebusqueda).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.noResults = data.length === 0; // Verifica si hay resultados

      });
    } else {
      // Si el campo está vacío, puedes optar por mostrar todas las ciudades
      this.sS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.noResults = false; // Reinicia el estado

      });
    }
  }
}
