import { iCliente } from "./cliente";

export interface iConta {

  id: number;
  agencia: string;
  cliente: iCliente;
  numero: string;
  saldo: number;
}

