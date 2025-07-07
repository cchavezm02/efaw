import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { TiendaService } from '../../../services/tienda.service';
import { ProductosService } from '../../../services/productos.service';
import { User } from '../../../models/user';
import { Tienda } from '../../../models/tienda';
import { Producto } from '../../../models/productos';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarproducto',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule],
  templateUrl: './insertareditarproducto.html',
  styleUrl: './insertareditarproducto.css'
})
export class Insertareditarproducto implements OnInit {
  form: FormGroup = new FormGroup({});
  producto: Producto = new Producto();
  id: number = 0;
  edicion: boolean = false;
  listatiendas: Tienda[] = [];
  listausuarios: User[] = [];
  
  constructor(
    private pS:ProductosService,
    private tS: TiendaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private sS: UserService
    
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idProducto: [''],
      nombreProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required],
      UnidadmedidaProducto: ['', Validators.required],
      precioProducto: ['', [Validators.required, Validators.min(0)]],
      usuarioProducto: ['', Validators.required],
      tiendaProducto: ['', Validators.required],
      
    });
    // Cargar listas de usuarios y tiendas
    this.sS.list().subscribe(data => {
      this.listausuarios = data;
    });
    this.tS.list().subscribe(data => {
      this.listatiendas = data;
    });
  }
  aceptar() {
    if (this.form.valid) {      
      const usuarioId = this.form.value.usuarioProducto;
      const tiendaId = this.form.value.tiendaProducto;
      
      const productoData: any = {
        idproducto: this.form.value.idProducto || 0,
        nombreproducto: this.form.value.nombreProducto,
        descripcion: this.form.value.descripcionProducto,
        unidadmedida: this.form.value.UnidadmedidaProducto,
        precioproducto: Number(this.form.value.precioProducto),
        tienda: {
          idtienda: Number(tiendaId)
        },
        user: {
          userId: Number(usuarioId)
        }
      };
      
      if (this.edicion) {
        this.pS.update(productoData).subscribe(data => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(productoData).subscribe(data => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['/productos']);
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          idProducto: new FormControl(data.idproducto),
          nombreProducto: new FormControl(data.nombreproducto),
          descripcionProducto: new FormControl(data.descripcion),
          UnidadmedidaProducto: new FormControl(data.unidadmedida),
          precioProducto : new FormControl(data.precioproducto),
          usuarioProducto: new FormControl(data.us.userId),
          tiendaProducto: new FormControl(data.td.idtienda),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['producto', 'listarproducto']);
  }

}
