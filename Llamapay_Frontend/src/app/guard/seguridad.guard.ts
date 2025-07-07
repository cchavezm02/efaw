import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LoginService } from '../services/login.service';

export const seguridadGuard = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const lService = inject(LoginService);
  const router = inject(Router);

  // 1. Verifica que el usuario esté autenticado
  const autenticado = lService.verificar();
  if (!autenticado) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Obtiene roles permitidos de la ruta
  const rolesPermitidos = route.data['roles'] as string[];
  const rolUsuario = lService.getUserRole(); // Ya lo tienes implementado

  if (rolesPermitidos && !rolesPermitidos.includes(rolUsuario)) {
    alert('🚫 No tienes permisos para acceder a esta página');
    router.navigate(['']); // redirige al landing
    return false;
  }

  return true;
};