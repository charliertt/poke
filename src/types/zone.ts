// src/types/zone.ts

export type ZoneState = 'locked' | 'active' | 'completed';

export interface Zone {
  id: number;
  name: string;
  description: string;
  position: { x: number; y: number }; // Coordenadas dentro del Canvas
  state: ZoneState;
  requirements?: string; // Solo si está 'locked'
  progress?: number;     // De 0 a 100
  nextZoneId?: number;   // Para definir las conexiones
}