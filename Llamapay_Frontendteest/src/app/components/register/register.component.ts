import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector:'app-landing',
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl:'./register.component.html',
  styleUrl:'./register.component.css'
})
export class RegisterComponent implements OnInit{

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

       // Solo permite editar si es admin o si el cliente está editando su propia cuenta
    if (this.edicion && !this.puedeEditarEstePerfil()) {
      alert('🚫 No tienes permisos para editar esta cuenta.');
      this.router.navigate(['']);
    }

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
  puedeEditarEstePerfil(): boolean {
  const rol = this.uS.getUserRole();
  const usernameActual = this.uS.getUsername();
  return rol === 'ADMIN' || (this.edicion && this.form.value.username === usernameActual);
}
mostrarEliminar(): boolean {
  return this.edicion && this.uS.getUserRole() === 'CLIENTE' && this.uS.getUsername() === this.form.value.username;
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
        this.router.navigate(['/']); 
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

  eliminar(): void {
  if (confirm('¿Seguro deseas eliminar tu cuenta?')) {
    this.uS.deleteS(this.id).subscribe(() => {
      this.uS.list().subscribe(data => {
        this.uS.setList(data);
      });
      sessionStorage.clear();
      this.router.navigate(['/']);
    });
  }
}
}
