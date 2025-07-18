import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Categoria } from '../../../models/categoria';
import { CategoriaService } from '../../../services/categoria.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css',
})
export class InsertareditarCategoria implements OnInit {
  //4
  form: FormGroup = new FormGroup({}); //1 y del angular
  categoria: Categoria = new Categoria(); //2 y tiene que ser del models
  //para editar
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private cS: CategoriaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {} //tiene que ser del angular material

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //actualizar
      this.init();
    });

    this.form = this.formBuilder.group({
      //creamos el cuerpo del post
      codigo: [''],
      name: ['', Validators.required], //5
      type: ['', Validators.required], //6
    });
  }

  //metodo aceptar
  aceptar() {
    if (this.form.valid) {
      this.categoria.idCategory = this.form.value.codigo;
      this.categoria.nameCategory = this.form.value.name;
      this.categoria.typeCategory = this.form.value.type;
      if (this.edicion) {
        //actualizar
        this.cS.update(this.categoria).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      } else {
        //INSERTAR
        this.cS.insert(this.categoria).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
          });
        });
      }
      this.router.navigate(['categoria']); //9
    }
  }

  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idCategory),
          name: new FormControl(data.nameCategory),
          type: new FormControl(data.typeCategory),
        });
      });
    }
  }
}