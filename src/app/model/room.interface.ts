// room.interface.ts
export interface Room {
  id: number;
  number: string; // Número de la habitación
  type: string; // Tipo de habitación (individual, doble, suite, etc.)
  price: number; // Precio por noche
  status: 'AVAILABLE' | 'RESERVED' | 'OCCUPIED' | 'UNDER_MAINTENANCE'; // Estado de la habitación
}
