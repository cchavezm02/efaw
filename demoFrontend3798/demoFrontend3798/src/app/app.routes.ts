import { Routes } from '@angular/router';
import { ServerComponent } from './components/server/server.component';
import { CreaeditaservidorComponent } from './components/server/creaeditaservidor/creaeditaservidor.component';

import { AplicacionesComponent } from './components/aplicaciones/aplicaciones.component';
import { InsertareditarComponent } from './components/aplicaciones/insertareditar/insertareditar.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { Reporte02Component } from './components/reportes/reporte02/reporte02.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { Reporte01Component } from './components/reportes/reporte01/reporte01.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { BusquedaComponent } from './components/server/busqueda/busqueda.component';

export const routes: Routes = [   
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'servidores',
    component: ServerComponent,
    children: [
      { path: 'nuevo', component: CreaeditaservidorComponent },
      { path: 'ediciones/:id', component: CreaeditaservidorComponent },
      {path:'busquedas',component:BusquedaComponent}
    ],
    canActivate: [seguridadGuard],

   
  },
  {
    path: 'aplicaciones',
    component: AplicacionesComponent,
    children: [
      { path: 'nuevo', component: InsertareditarComponent }],
          canActivate: [seguridadGuard],

  },
  {
    path: 'reportes',
    component: ReportesComponent,
    children: [
      {
        path: 'reportecantidad',
        component: Reporte01Component,
      },
      {
        path: 'reportesuma',
        component: Reporte02Component,
      },
    ],
        canActivate: [seguridadGuard],

  }
  ,
  {
    path: 'homes',
    component: HomeComponent,
        canActivate: [seguridadGuard],

  },
];
