import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { EmpleadoService } from '../../services/empleado.service';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  template: `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
      <h2 style="margin:0;">Empleados</h2>
      <a routerLink="/empleados/nuevo" style="
        display:inline-block;
        padding:10px 20px;
        background:#2563eb;
        color:#fff;
        text-decoration:none;
        border-radius:8px;
        font-weight:500;
      ">+ Nuevo Empleado</a>
    </div>

    <p *ngIf="error" style="color:red">{{ error }}</p>

    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr style="background:#f8fafc; text-align:left;">
          <th style="padding:12px; border-bottom:2px solid #e2e8f0;">Nombres</th>
          <th style="padding:12px; border-bottom:2px solid #e2e8f0;">Apellidos</th>
          <th style="padding:12px; border-bottom:2px solid #e2e8f0;">Cargo</th>
          <th style="padding:12px; border-bottom:2px solid #e2e8f0;">Estado</th>
          <th style="padding:12px; border-bottom:2px solid #e2e8f0;">Accion</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let e of empleados" style="border-bottom:1px solid #f1f5f9;">
          <td style="padding:12px;"><strong>{{ e.nombres }}</strong></td>
          <td style="padding:12px;">{{ e.apellidos }}</td>
          <td style="padding:12px;">
            <span style="background:#eff6ff; color:#1d4ed8; padding:4px 12px; border-radius:20px; font-size:13px;">
              {{ cargoNombre(e.cargoId) }}
            </span>
          </td>
          <td style="padding:12px;">
            <span [style]="e.estado === 'ACTIVO' ? 'background:#f0fdf4; color:#16a34a; padding:4px 12px; border-radius:20px; font-size:13px;' : 'background:#fef2f2; color:#dc2626; padding:4px 12px; border-radius:20px; font-size:13px;'">
              {{ e.estado }}
            </span>
          </td>
          <td style="padding:12px; display:flex; gap:6px;">
            <button style="padding:6px 14px; background:#6b7280; color:#fff; border:none; border-radius:6px; cursor:pointer;">Detalles</button>
            <button (click)="confirmarEliminar(e.id)" style="padding:6px 14px; background:#dc2626; color:#fff; border:none; border-radius:6px; cursor:pointer;">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de confirmacion -->
    <div *ngIf="showModal" style="
      position:fixed; top:0; left:0; width:100%; height:100%;
      background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:999;
    ">
      <div style="
        background:#fff; border-radius:16px; padding:32px; width:100%; max-width:360px;
        box-shadow:0 20px 60px rgba(0,0,0,0.3); text-align:center;
      ">
        <h3 style="margin:0 0 8px 0; font-size:18px;">¿Eliminar empleado?</h3>
        <p style="color:#6b7280; font-size:14px; margin-bottom:24px;">Esta accion no se puede deshacer.</p>
        <div style="display:flex; gap:12px; justify-content:center;">
          <button (click)="cancelarEliminar()" style="
            padding:10px 24px; background:#f3f4f6; color:#374151; border:none;
            border-radius:8px; font-size:14px; cursor:pointer;
          ">Cancelar</button>
          <button (click)="ejecutarEliminar()" style="
            padding:10px 24px; background:#dc2626; color:#fff; border:none;
            border-radius:8px; font-size:14px; cursor:pointer;
          ">Eliminar</button>
        </div>
      </div>
    </div>
  `
})
export class ListaEmpleadosComponent implements OnInit {
  private empleadoService = inject(EmpleadoService);
  private cargoService = inject(CargoService);
  private cdr = inject(ChangeDetectorRef);
  empleados: any[] = [];
  cargoMap = new Map<number, string>();
  error = '';
  showModal = false;
  selectedId: number | null = null;

  async ngOnInit(): Promise<void> {
    try {
      this.cargoMap = await this.cargoService.listar();
    } catch (e) {
      console.log('Error cargando cargos');
    }

    try {
      const res = await this.empleadoService.listar();
      this.empleados = res.data || [];
    } catch (e) {
      this.error = 'Error al cargar empleados';
    }
    this.cdr.detectChanges();
  }

  cargoNombre(id: number): string {
    return this.cargoMap.get(id) || String(id);
  }

  confirmarEliminar(id: number): void {
    this.selectedId = id;
    this.showModal = true;
  }

  cancelarEliminar(): void {
    this.showModal = false;
    this.selectedId = null;
  }

  async ejecutarEliminar(): Promise<void> {
    if (this.selectedId === null) return;
    try {
      await this.empleadoService.eliminar(this.selectedId);
      this.empleados = this.empleados.filter(e => e.id !== this.selectedId);
    } catch (e) {
      console.log('Error al eliminar');
    }
    this.showModal = false;
    this.selectedId = null;
    this.cdr.detectChanges();
  }
}
