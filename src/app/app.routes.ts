import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
  { path: 'empleados', loadComponent: () => import('./components/lista-empleados/lista-empleados.component').then(m => m.ListaEmpleadosComponent) },
  { path: 'empleados/nuevo', loadComponent: () => import('./components/registro-empleado/registro-empleado.component').then(m => m.RegistroEmpleadoComponent) },
  { path: '**', redirectTo: '/login' }
];
