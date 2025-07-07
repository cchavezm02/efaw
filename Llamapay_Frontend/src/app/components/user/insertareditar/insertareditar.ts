import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
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
export class InsertareditarUser implements OnInit{ 
  form: FormGroup = new FormGroup({});
  user: User = new User();
  id: number = 0
  edicion: boolean = false

  listaUsuarios: User[]=[]
  estados: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Activo' },
    { value: false, viewValue: 'Deshabilitado' },
  ];
  constructor(private uS: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
     private route: ActivatedRoute ){ 
  }
  
  ngOnInit(): void {
    
    this.route.params.subscribe((data: Params) => {

      this.id = data['id']
      this.edicion = data['id'] != null
      //actualizar
      this.init()
    }
    )  
    
    this.form = this.formBuilder.group({ //creamos el cuerpo del post
        codigo: [''],
        name: ['', Validators.required], //5
        lastname: ['', Validators.required],
        email:['', Validators.required],
        birthday:['', Validators.required],
        username:['', Validators.required],
        password:['', Validators.required],
        estadoUsuario:['', Validators.required],
    })
  }

  insertar():void {
  this.form.markAllAsTouched();
  if (this.form.invalid) {
    console.log("Formulario inválido.");
    return;
  }
    if(this.form.valid){
      this.user.userId = this.form.value.codigo;
      this.user.nameUser = this.form.value.name; 
      this.user.lastnameUser = this.form.value.lastname;
      this.user.emailUser = this.form.value.email;
      this.user.birthdayUser=this.form.value.birthday;
      this.user.username = this.form.value.username;
      this.user.password = this.form.value.password;
      this.user.enabled = this.form.value.estadoUsuario;

      if (this.edicion) {
        //actualizar
        this.uS.update(this.user).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      } else {
        //INSERTAR
        this.uS.insert(this.user).subscribe(data => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data)
          })
        })
      }
        this.router.navigate(['users']); 
      }
    }
    init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          codigo: new FormControl(data.userId),
          name: new FormControl(data.nameUser),
          lastname: new FormControl(data.lastnameUser),
          email: new FormControl(data.emailUser),
          birthday: new FormControl(data.birthdayUser),
          username: new FormControl(data.username),
          estadoUsuario: new FormControl(data.enabled),
          })
      })
    }
  }
}
