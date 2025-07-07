import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Static routes (no parameters)
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'registro', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'categorias', renderMode: RenderMode.Prerender },
  { path: 'servicios', renderMode: RenderMode.Prerender },
  { path: 'metodopagos', renderMode: RenderMode.Prerender },
  { path: 'users', renderMode: RenderMode.Prerender },
  { path: 'roles', renderMode: RenderMode.Prerender },
  { path: 'objetivoahorros', renderMode: RenderMode.Prerender },
  { path: 'reportes', renderMode: RenderMode.Prerender },
  { path: 'transaccion', renderMode: RenderMode.Prerender },
  { path: 'tipotransaccion', renderMode: RenderMode.Prerender },
  { path: 'tipocuenta', renderMode: RenderMode.Prerender },
  { path: 'productos', renderMode: RenderMode.Prerender },
  { path: 'tiendas', renderMode: RenderMode.Prerender },
  { path: 'perfil', renderMode: RenderMode.Prerender },
  { path: 'succes', renderMode: RenderMode.Prerender },
  { path: 'cancel', renderMode: RenderMode.Prerender },
  
  // Routes with parameters - use server-side rendering
  { path: 'categorias/ediciones/:id', renderMode: RenderMode.Server },
  { path: 'servicios/ediciones/:id', renderMode: RenderMode.Server },
  { path: 'metodopagos/ediciones/:id', renderMode: RenderMode.Server },
  { path: 'users/ediciones/:id', renderMode: RenderMode.Server },
  { path: 'objetivoahorros/ediciones/:id', renderMode: RenderMode.Server },
  { path: 'transaccion/editar/:id', renderMode: RenderMode.Server },
  { path: 'tipotransaccion/editar/:id', renderMode: RenderMode.Server },
  { path: 'tipocuenta/editar/:id', renderMode: RenderMode.Server },
  { path: 'productos/editar/:id', renderMode: RenderMode.Server },
  { path: 'productos/ediciones/:id', renderMode: RenderMode.Server },
  { path: 'tiendas/editar/:id', renderMode: RenderMode.Server },
  { path: 'tiendas/ediciones/:id', renderMode: RenderMode.Server },
  
  // Fallback for any other routes
  { path: '**', renderMode: RenderMode.Server }
];
