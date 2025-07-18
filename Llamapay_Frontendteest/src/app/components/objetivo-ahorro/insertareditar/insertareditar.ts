import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObjetivoAhorro } from '../../../models/objetivoahorro';
import { ObjetivoAhorroService } from '../../../services/objetivoahorro.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarObjetivoAhorro implements OnInit {
  form: FormGroup = new FormGroup({})
  
  objetivoAhorro: ObjetivoAhorro = new ObjetivoAhorro()

  id:number=0;
  actualizar: boolean = false;

estadoObjetivos: { value: string; viewValue: string; }[] = [
  { value: 'En espera de Aceptación', viewValue: 'En espera de Aceptación' },
  { value: 'En progreso', viewValue: 'En progreso',}, 
  { value: 'Dado de Baja', viewValue: 'Dado de Baja', }
];

  listaUsuarios:User[]=[]

  constructor(
    private formBuilder: FormBuilder,
    private oS: ObjetivoAhorroService,
    private router: Router,
    private uS:UserService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params)=>{
      this.id = data['id'];
      this.actualizar = data ['id']!=null;

      this.init();
    });


this.form = this.formBuilder.group({
  codigo: [''],
  meta: ['', Validators.required],
  montoMeta: ['', Validators.required],
  fechaInicial: ['', Validators.required],
  fechaFinal: ['', Validators.required],
  montoActual: ['', Validators.required],
  estado: ['', Validators.required],
  user: ['', Validators.required]
}, { validators: this.validarFechas() });

    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.objetivoAhorro.objetivoId = this.form.value.codigo
      this.objetivoAhorro.nombreMeta = this.form.value.meta
      this.objetivoAhorro.montoMeta = this.form.value.montoMeta
      this.objetivoAhorro.fechaInicio = this.form.value.fechaInicial.toISOString().split('T')[0];
      this.objetivoAhorro.fechaFin = this.form.value.fechaFinal.toISOString().split('T')[0];
      this.objetivoAhorro.montoActual = this.form.value.montoActual
      this.objetivoAhorro.estadoObjetivo = this.form.value.estado
      this.objetivoAhorro.user = this.listaUsuarios.find(u => u.userId === this.form.value.user) ?? new User();

      if(this.actualizar){
          this.oS.update(this.objetivoAhorro).subscribe(()=>{
            this.oS.list().subscribe(data=>{
              this.oS.setList(data);
            })
          })
      }
      else{
      this.oS.insert(this.objetivoAhorro).subscribe(() => {
        this.oS.list().subscribe(data => {
          this.oS.setList(data)
        })
      })
    }
      this.router.navigate(['objetivoahorros'])
    }
  }

  init(){
    if(this.actualizar){
        this.oS.listaId(this.id).subscribe((data)=>{
          this.form = new FormGroup({
           codigo: new FormControl(data.objetivoId),
           meta: new FormControl(data.nombreMeta, Validators.required),
           montoMeta: new FormControl(data.montoMeta, Validators.required),
           fechaInicial: new FormControl(data.fechaInicio, Validators.required),
           fechaFinal: new FormControl(data.fechaFin, Validators.required),
           montoActual: new FormControl(data.montoActual, Validators.required),
           estado: new FormControl(data.estadoObjetivo, Validators.required),
           user: new FormControl(data.user.userId, Validators.required)
          })  
        })
    }
  }
  validarFechas() {
  return (formGroup: FormGroup) => {
    const fechaInicial = formGroup.get('fechaInicial')?.value;
    const fechaFinal = formGroup.get('fechaFinal')?.value;

    if (!fechaInicial || !fechaFinal) return null;

    const fechaInicio = new Date(fechaInicial);
    const fechaFin = new Date(fechaFinal);

    if (fechaFin <= fechaInicio) {
      formGroup.get('fechaFinal')?.setErrors({ fechaInvalida: true });
    } else {
      formGroup.get('fechaFinal')?.setErrors(null);
    }

    return null;
  };
}

// No permitir fechas futuras en fechaInicial
deshabilitarFechasFuturas = (fecha: Date | null): boolean => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return fecha ? fecha <= hoy : false;
};

// Solo permitir fechas después de la fechaInicial en fechaFinal
deshabilitarFechasAnteriores = (fecha: Date | null): boolean => {
  const fechaInicio = this.form.get('fechaInicial')?.value;
  if (!fechaInicio) return false;

  const inicio = new Date(fechaInicio);
  inicio.setDate(inicio.getDate() + 1); // día siguiente
  inicio.setHours(0, 0, 0, 0);
  return fecha ? fecha >= inicio : false;
};

}