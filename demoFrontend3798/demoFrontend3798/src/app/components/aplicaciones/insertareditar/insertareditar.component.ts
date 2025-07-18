import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aplicacion } from '../../../models/aplicacion';
import { AplicacionService } from '../../../services/aplicacion.service';
import { Router } from '@angular/router';
import { ServerService } from '../../../services/server.service';
import { Server } from '../../../models/Server';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],

  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit{
    form: FormGroup = new FormGroup({});
    aplicacion: Aplicacion = new Aplicacion();
    listaServidores: Server[] = [];
    estado:boolean=false
    
    tipos: { value: string; viewValue: string }[] = [
    { value: 'SO', viewValue: 'SO' },
    { value: 'Ofimática', viewValue: 'Ofimática' },
  ];

  constructor(
    private aS: AplicacionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private  sS:ServerService
  ) {}

  ngOnInit(): void {

        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            state: ['', Validators.required],
            dateImpl: ['',Validators.required],
            amount: ['', Validators.required],
            type: [ '',Validators.required],
            server: [ '',Validators.required],
    });
     this.sS.list().subscribe((d) => {
      this.listaServidores = d;
    });
  }
   aceptar(): void {
    if (this.form.valid) {
      this.aplicacion.nameApp = this.form.value.name;
      this.aplicacion.stateApp = this.form.value.state;
      this.aplicacion.implementationDateApp = this.form.value.dateImpl;
      this.aplicacion.amountApp = this.form.value.amount;
      this.aplicacion.typeApp = this.form.value.type;
      this.aplicacion.server.idServer = this.form.value.server;

      this.aS.insert(this.aplicacion).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });     

    }
              this.router.navigate(['aplicaciones']);

  }

}
