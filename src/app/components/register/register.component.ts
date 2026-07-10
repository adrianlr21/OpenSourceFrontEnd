import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div style="display:flex; justify-content:center; align-items:center; min-height:80vh;">
      <div style="background:#fff; padding:40px; border-radius:16px; box-shadow:0 4px 24px rgba(0,0,0,0.1); width:100%; max-width:380px;">
        <h2 style="text-align:center; margin-bottom:4px;">Registrarse</h2>
        <p style="text-align:center; color:#6b7280; font-size:14px; margin-bottom:24px;">Crea tu cuenta</p>

        <form #f="ngForm" (ngSubmit)="register()">
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:13px; font-weight:500; margin-bottom:6px; color:#374151;">Nombres</label>
            <input name="nom" [(ngModel)]="nombres" required placeholder="Tus nombres"
              style="width:100%; padding:10px 14px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
          </div>
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:13px; font-weight:500; margin-bottom:6px; color:#374151;">Apellidos</label>
            <input name="ape" [(ngModel)]="apellidos" required placeholder="Tus apellidos"
              style="width:100%; padding:10px 14px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
          </div>
          <div style="margin-bottom:12px;">
            <label style="display:block; font-size:13px; font-weight:500; margin-bottom:6px; color:#374151;">Email</label>
            <input type="email" name="email" [(ngModel)]="email" required placeholder="tu@email.com"
              style="width:100%; padding:10px 14px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block; font-size:13px; font-weight:500; margin-bottom:6px; color:#374151;">Contrasena</label>
            <input type="password" name="pass" [(ngModel)]="password" required placeholder="••••••••"
              style="width:100%; padding:10px 14px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
          </div>

          <p *ngIf="error" style="color:#dc2626; font-size:14px; margin-bottom:12px;">{{ error }}</p>

          <button [disabled]="f.invalid"
            style="width:100%; padding:10px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer;">
            Registrarse
          </button>
        </form>

        <p style="text-align:center; margin-top:16px; font-size:14px; color:#6b7280;">
          ¿Ya tienes cuenta? <a routerLink="/login" style="color:#2563eb; text-decoration:none; font-weight:500;">Inicia sesion</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  nombres = '';
  apellidos = '';
  email = '';
  password = '';
  error = '';

  register(): void {
    this.auth.register(this.nombres, this.apellidos, this.email, this.password).then(res => {
      if (res.data?.token) {
        this.auth.saveToken(res.data.token);
        this.router.navigate(['/empleados']);
      } else {
        this.error = 'Error al registrarse';
      }
    });
  }
}
