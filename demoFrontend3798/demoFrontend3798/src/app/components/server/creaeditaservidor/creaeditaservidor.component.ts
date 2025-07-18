import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../services/server.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Server } from '../../../models/Server';

@Component({
  selector: 'app-creaeditaservidor',
  imports: [
    MatFormFieldModule,
    NgIf,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
],
  templateUrl: './creaeditaservidor.component.html',
  styleUrl: './creaeditaservidor.component.css'
})
export class CreaeditaservidorComponent implements OnInit{
    form: FormGroup = new FormGroup({});
    servidor: Server = new Server();
    id: number = 0;
    edicion: boolean = false;

    proveedores: { value: string; viewValue: string }[] = [
    { value: 'IBM', viewValue: 'IBM' },
    { value: 'Lenovo', viewValue: 'Lenovo' },
    { value: 'Intel', viewValue: 'Intel' },
    { value: 'Oracle', viewValue: 'Oracle' },
  ];

  constructor(
    private sS: ServerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

        this.form = this.formBuilder.group({
            id: [''],
            name: ['', Validators.required],
            ip: ['', Validators.required],
            ubication: ['', Validators.required],
            so: [ '',Validators.required],
            dateStart: ['',Validators.required],     
            provider: ['', Validators.required],
    });
  }
   aceptar(): void {
    if (this.form.valid) {
      this.servidor.idServer = this.form.value.id;
      this.servidor.nameServer = this.form.value.name;
      this.servidor.ipServer = this.form.value.ip;
      this.servidor.ubicationServer = this.form.value.ubication;
      this.servidor.soServer = this.form.value.so;
      this.servidor.startDateOperationServer = this.form.value.dateStart;
      this.servidor.providerServer = this.form.value.provider;
       if (this.edicion) {
        this.sS.update(this.servidor).subscribe(() => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      } else {
      this.sS.insert(this.servidor).subscribe((data) => {
          this.sS.list().subscribe((data) => {
            this.sS.setList(data);
          });
        });
      }
      this.router.navigate(['servidores']);
    }
  }
init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.idServer),
          name: new FormControl(data.nameServer),
          ip: new FormControl(data.ipServer),
          ubication: new FormControl(data.ubicationServer),
          so: new FormControl(data.soServer),
          dateStart: new FormControl(data.startDateOperationServer),
          provider: new FormControl(data.providerServer),
        });
      });
    }
  }
}
