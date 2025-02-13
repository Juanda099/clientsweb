// Generated by https://quicktype.io

import { Room } from "./room.interface";

export interface Client {
  reservation: any;
  roomId?: number;
  id: number;
  name: string;
  email: string;
  createAt: Date;
  habitacion: number;
  room?: Room | null;
  cedula: string; // Nuevo campo cedula
  ciudadD: string; // Nuevo campo ciudadD
  number: string;
}

