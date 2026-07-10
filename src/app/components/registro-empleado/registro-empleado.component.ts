import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-registro-empleado',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  template: `
    <div style="max-width:600px; margin:0 auto;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
        <h2 style="margin:0;">Registrar Empleado</h2>
        <a routerLink="/empleados" style="padding:8px 16px; background:#6b7280; color:#fff; text-decoration:none; border-radius:8px; font-size:14px;">Volver</a>
      </div>

      <div style="background:#fff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.08); padding:24px;">
        <form #f="ngForm" (ngSubmit)="guardar()">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">DNI</label>
              <input type="number" name="dni" [(ngModel)]="dni" required placeholder="12345678"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Edad</label>
              <input type="number" name="edad" [(ngModel)]="edad" required min="18"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Nombres</label>
              <input name="nom" [(ngModel)]="nombres" required placeholder="Nombres"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Apellidos</label>
              <input name="ape" [(ngModel)]="apellidos" required placeholder="Apellidos"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Sexo</label>
              <select name="sexo" [(ngModel)]="sexo"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none; background:#fff;">
                <option value="MASCULINO">Masculino</option>
                <option value="FEMENINO">Femenino</option>
              </select>
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Fecha Nac.</label>
              <input type="date" name="fec" [(ngModel)]="fechaNacimiento" required
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Correo</label>
              <input type="email" name="correo" [(ngModel)]="correo" required placeholder="correo@email.com"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Celular</label>
              <input type="number" name="cel" [(ngModel)]="celular" required placeholder="987654321"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Cargo ID</label>
              <input type="number" name="cargo" [(ngModel)]="cargoId" required placeholder="1"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Estado</label>
              <select name="estado" [(ngModel)]="estado"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none; background:#fff;">
                <option value="ACTIVO">Activo</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </div>
          </div>

          <h3 style="margin-top:24px; margin-bottom:12px; font-size:16px; color:#1e3a5f;">Direccion</h3>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Departamento</label>
              <input name="departamento" [(ngModel)]="departamento" placeholder="Lima"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Provincia</label>
              <input name="provincia" [(ngModel)]="provincia" placeholder="Lima"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Distrito</label>
              <input name="distrito" [(ngModel)]="distrito" placeholder="Miraflores"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
            <div>
              <label style="display:block; font-size:13px; font-weight:500; margin-bottom:4px; color:#374151;">Domicilio</label>
              <input name="domicilio" [(ngModel)]="domicilio" placeholder="Av. Principal 123"
                style="width:100%; padding:8px 12px; border:1.5px solid #d1d5db; border-radius:8px; font-size:14px; outline:none;">
            </div>
          </div>

          <div style="margin-top:16px; display:flex; align-items:center; gap:8px;">
            <input type="checkbox" name="aseg" [(ngModel)]="asegurado" id="aseg" style="width:auto;">
            <label for="aseg" style="font-size:14px; cursor:pointer;">Asegurado</label>
          </div>

          <p *ngIf="error" style="color:#dc2626; font-size:14px; margin-top:12px;">{{ error }}</p>

          <div style="margin-top:20px; display:flex; gap:12px;">
            <button [disabled]="f.invalid"
              style="padding:10px 24px; background:#2563eb; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:500; cursor:pointer;">
              Guardar Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegistroEmpleadoComponent {
  private service = inject(EmpleadoService);
  private router = inject(Router);

  dni = 0;
  nombres = '';
  apellidos = '';
  edad = 18;
  sexo = 'MASCULINO';
  fechaNacimiento = '';
  correo = '';
  celular = 0;
  cargoId = 0;
  estado = 'ACTIVO';
  asegurado = false;
  departamento = '';
  provincia = '';
  distrito = '';
  domicilio = '';
  error = '';

  guardar(): void {
    const data = {
      dni: this.dni,
      nombres: this.nombres,
      apellidos: this.apellidos,
      edad: this.edad,
      sexo: this.sexo,
      fechaNacimiento: this.fechaNacimiento,
      correo: this.correo,
      celular: this.celular,
      cargoId: this.cargoId,
      estado: this.estado,
      asegurado: this.asegurado
    };
    if (this.departamento || this.provincia || this.distrito || this.domicilio) {
      (data as any).direccion = {
        departamento: this.departamento,
        provincia: this.provincia,
        distrito: this.distrito,
        domicilio: this.domicilio
      };
    }
    this.service.crear(data).then(res => {
      if (res.data) {
        this.router.navigate(['/empleados']);
      } else {
        this.error = 'Error al guardar';
      }
    });
  }
}
