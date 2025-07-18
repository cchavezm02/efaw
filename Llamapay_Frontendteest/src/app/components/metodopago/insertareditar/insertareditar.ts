import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MetodoPago } from '../../../models/metodopago';
import { MetodoPagoService } from '../../../services/metodopago.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-insertareditar',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarMetodoPago implements OnInit{ 
  form: FormGroup = new FormGroup({});
  metodopago: MetodoPago = new MetodoPago();

  TipoPago: { value: string; viewValue: string }[] = [
    { value: 'Yape', viewValue: 'Yape' },
    { value: 'Plin', viewValue: 'Plin' },
    { value: 'Tunki', viewValue: 'Tunki' },
    { value: 'Lukita', viewValue: 'Lukita' },
    { value: 'Bim', viewValue: 'Bim' },
    { value: 'Agora Pay', viewValue: 'Agora Pay' },
    { value: 'PagoEfectivo', viewValue: 'PagoEfectivo' }
  ]  
  id: number = 0
  edicion: boolean = false
  
  
  constructor(private mpS: MetodoPagoService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()

    }
  )
    this.form = this.formBuilder.group({ 
        codigo:[''],
        name: ['', Validators.required], 
        type: ['', Validators.required],
        description:['', Validators.required], 
    }
  )
 }
  
  aceptar(){
    if(this.form.valid){
      this.metodopago.idMetodoPago = this.form.value.codigo
      this.metodopago.nombreMetodoPago = this.form.value.name; 
      this.metodopago.tipoMetodoPago = this.form.value.type;
      this.metodopago.descripcion = this.form.value.description; 

       if (this.edicion) {
        //actualizar
        this.mpS.update(this.metodopago).subscribe(data => {
          this.mpS.list().subscribe(data => {
            this.mpS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.mpS.insert(this.metodopago).subscribe(data => {
          this.mpS.list().subscribe(data => {
            this.mpS.setList(data)
          })
        })
      }
      this.router.navigate(['metodopagos'])
    }

  }
init() {
    if (this.edicion) {
      this.mpS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idMetodoPago),
          name: new FormControl(data.nombreMetodoPago),
          type: new FormControl(data.tipoMetodoPago),
          description: new FormControl(data.descripcion),
        })
      })

    }
  }  
}

