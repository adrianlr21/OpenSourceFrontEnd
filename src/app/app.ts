import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  template: `
    <nav *ngIf="token" style="background:#1e3a5f; padding:10px 20px; display:flex; gap:20px; align-items:center;">
      <a routerLink="/empleados" style="color:white; text-decoration:none; font-weight:bold;">Control de Personal</a>
      <button (click)="logout()" style="margin-left:auto; padding:8px 18px; background:#ef4444; color:#fff; border:none; border-radius:8px; font-weight:500; font-size:14px; cursor:pointer; transition:background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='#ef4444'">Cerrar sesion</button>
    </nav>
    <div style="padding:20px">
      <router-outlet />
    </div>
  `
})
export class App {
  private router = inject(Router);

  get token(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
