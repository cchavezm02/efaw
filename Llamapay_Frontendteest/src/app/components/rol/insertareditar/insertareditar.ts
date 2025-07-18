import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
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
export class InsertareditarRol implements OnInit {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;

  TipoRol = [
    { value: 'ADMIN', viewValue: 'ADMIN' },
    { value: 'TESTER', viewValue: 'TESTER' },
    { value: 'USER', viewValue: 'USER' }
  ];

  listaUsuarios: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private oS: RolService,
    private router: Router,
    private uS: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      roles: ['', Validators.required],
      user: ['', Validators.required]
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.rol.rolId = this.form.value.id;
      this.rol.tipoRol = this.form.value.roles;

      const user = new User();
      user.userId = this.form.value.user;
      this.rol.user = user;

      if (this.edicion) {
        this.oS.update(this.rol).subscribe(() => {
          this.oS.list().subscribe(data => {
            this.oS.setList(data);
          });
        });
      } else {
        this.oS.insert(this.rol).subscribe(() => {
          this.oS.list().subscribe(data => {
            this.oS.setList(data);
          });
        });
      }

      this.router.navigate(['roles']);
    }
  }

  init(): void {
    if (this.edicion) {
      this.oS.listaId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.rolId),
          roles: new FormControl(data.tipoRol, Validators.required),
          user: new FormControl(data.user.userId, Validators.required)
        });
      });
    }
  }
}