import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private base = 'http://localhost:8080/api/empleados';

  private headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  }

  listar(): Promise<any> {
    return fetch(`${this.base}/lista`, { headers: this.headers() }).then(r => r.json());
  }

  crear(data: any): Promise<any> {
    return fetch(`${this.base}/crear`, {
      method: 'POST',
      headers: this.headers(),
      body: JSON.stringify(data)
    }).then(r => r.json());
  }

  async eliminar(id: number): Promise<any> {
    const res = await fetch(`${this.base}/eliminar/${id}`, {
      method: 'DELETE',
      headers: this.headers()
    });
    if (!res.ok) throw new Error('Error al eliminar');
    try {
      return await res.json();
    } catch {
      return {};
    }
  }
}
