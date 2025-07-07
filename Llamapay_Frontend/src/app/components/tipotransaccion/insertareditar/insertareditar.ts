import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoTransaccionService } from '../../../services/tipotransaccion.service';
import { TipoTransaccion } from '../../../models/tipotransaccion';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertar-editar-tipotransaccion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.html',
  styleUrls: ['./insertareditar.css']
})
export class InsertarEditarTipoTransaccionComponent implements OnInit {
  form: FormGroup;
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private tipoService: TipoTransaccionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      tipoGastoId: [0],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.tipoService.listId(this.id).subscribe(data => {
          this.form.setValue({
            tipoGastoId: data.tipoGastoId,
            descripcion: data.descripcion
          });
        });
      }
    });
  }

  aceptar(): void {
    const tipo: TipoTransaccion = this.form.value;
    if (this.form.valid) {
      if (this.edicion) {
        this.tipoService.update(tipo).subscribe(() => {
          this.operar();
        });
      } else {
        this.tipoService.insert(tipo).subscribe(() => {
          this.operar();
        });
      }
    }
  }

  operar(): void {
    this.tipoService.list().subscribe(data => {
      this.tipoService.setList(data);
      this.router.navigate(['/tipotransaccion/listar']);
    });
  }

  cancelar(): void {
    this.tipoService.list().subscribe(data => {
      this.tipoService.setList(data);
      this.router.navigate(['/tipotransaccion/listar']);
    });
  }
}