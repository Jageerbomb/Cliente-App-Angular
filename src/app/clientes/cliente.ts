import {Region} from "./region";

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: Date;
  email: string;
  foto: string;
  region: Region;
}
