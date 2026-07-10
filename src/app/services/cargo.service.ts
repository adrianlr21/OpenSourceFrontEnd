import { Injectable } from '@angular/core';

const DESCRIPCIONES: Record<string, string> = {
  OPERARIO_EMPASTADOR: 'Operario Empastador',
  OPERARIO_PINTOR: 'Operario Pintor',
  OPERARIO_CAPATAZ: 'Operario Capataz',
  OPERARIO_OFICIAL: 'Operario Oficial',
  SUPERVISOR: 'Supervisor',
  AYUDANTE: 'Ayudante',
  LIMPIEZA: 'Limpieza'
};

@Injectable({ providedIn: 'root' })
export class CargoService {
  async listar(): Promise<Map<number, string>> {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:8080/api/cargos/lista', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    const map = new Map<number, string>();
    if (json.data) {
      for (const c of json.data) {
        map.set(c.id, DESCRIPCIONES[c.nombre] || c.nombre);
      }
    }
    return map;
  }
}
