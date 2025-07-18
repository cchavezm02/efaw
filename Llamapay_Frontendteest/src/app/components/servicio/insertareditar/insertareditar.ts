import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Servicio } from '../../../models/servicio';
import { ServicioService } from '../../../services/servicio.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../services/categoria.service';
import { Categoria } from '../../../models/categoria';

@Component({
  selector: 'app-insertareditar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarServicio implements OnInit{
  form: FormGroup = new FormGroup({});
  serv: Servicio = new Servicio();
  listcategorias: Categoria[] = []; // Lista de categorías
  // Inyectamos el servicio de categorías para obtener la lista de categorías

  id: number = 0
  edicion: boolean = false 
  // Agregamos una propiedad para manejar la edición


  constructor(
    private sS: ServicioService,
    private router: Router, 
    private formBuilder: FormBuilder,
    private cS: CategoriaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => { // Suscribimos a los parámetros de la ruta
      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    })

    // Inicializamos el formulario
      this.form = this.formBuilder.group({
        hcodigo: [''], // Este campo puede ser opcional o no necesario
        hnamecompany: ['', Validators.required], 
        hnameservice: ['',Validators.required], 
        hidCategory: ['',Validators.required], 
    }) 
    this.cS.list().subscribe(data => {
      this.listcategorias = data; // Asignamos la lista de categorías al componente
    })
  }

  aceptar(): void{
    if(this.form.valid){
      this.serv.idService =this.form.value.hcodigo; // Asignamos el código del servicio
      this.serv.nameCompanyService = this.form.value.hnamecompany;
      this.serv.nameService = this.form.value.hnameservice;  
      this.serv.category.idCategory = this.form.value.hidCategory; 
      
      if(this.edicion){ // Si estamos en modo edición
        //actualizar
        this.sS.update(this.serv).subscribe(data=>{
          this.sS.list().subscribe(data =>{
            this.sS.setList(data); 
          });
        });
      }else{
        //insertar
        this.sS.insert(this.serv).subscribe(data=>{
          this.sS.list().subscribe(data =>{
            this.sS.setList(data); 
          });
        });
      }
        this.router.navigate(['servicio'])
    }
  }

  init(){ // Método para inicializar el formulario en modo edición
    if(this.edicion){
      this.sS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idService),
          hnamecompany: new FormControl(data.nameCompanyService),
          hnameservice: new FormControl(data.nameService),
          hidCategory: new FormControl(data.category.idCategory)
        })
      });
    }
  }
}