import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TipoCuentaService } from '../../../services/tipocuenta.service';
import { TipoCuenta } from '../../../models/tipocuenta';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditar-tipocuenta',
  standalone: true,
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class InsertareditarTipoCuentaComponent implements OnInit {
  form: FormGroup;
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private tipoCuentaService: TipoCuentaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      idTipoCuenta: [0],
      nombreTipoCuenta: ['', Validators.required],
      numeroTipoCuenta: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,20}$/)]
      ],
      tipodeCuenta: ['', Validators.required],
      saldoTipoCuenta: [
        0,
        [Validators.required, Validators.min(0), Validators.max(1000000)]
      ],
      monedaTipoCuenta: ['', Validators.required],
      user: this.fb.group({
        userId: [1, Validators.required]
      })
    });
  }

  get userIdControl() {
    return this.form.get('user.userId') as FormControl;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.edicion = !!this.id;

      if (this.edicion) {
        this.tipoCuentaService.list().subscribe(data => {
          const cuenta = data.find(c => c.idTipoCuenta === this.id);
          if (cuenta) {
            this.form.setValue({
              idTipoCuenta: cuenta.idTipoCuenta,
              nombreTipoCuenta: cuenta.nombreTipoCuenta,
              numeroTipoCuenta: cuenta.numeroTipoCuenta,
              tipodeCuenta: cuenta.tipodeCuenta,
              saldoTipoCuenta: cuenta.saldoTipoCuenta,
              monedaTipoCuenta: cuenta.monedaTipoCuenta,
              user: {
                userId: cuenta.user?.userId || 1
              }
            });
          }
        });
      } else {
        this.form.reset();
        this.userIdControl.setValue(1);
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      const tipoCuenta: TipoCuenta = this.form.value;

      if (this.edicion) {
        this.tipoCuentaService.update(tipoCuenta).subscribe(() => {
          this.tipoCuentaService.list().subscribe(data => {
            this.tipoCuentaService.setList(data);
            this.router.navigate(['/tipocuenta/listar']);
          });
        });
      } else {
        this.tipoCuentaService.insert(tipoCuenta).subscribe(() => {
          this.tipoCuentaService.list().subscribe(data => {
            this.tipoCuentaService.setList(data);
            this.router.navigate(['/tipocuenta/listar']);
          });
        });
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/tipocuenta/listar']);
  }
}