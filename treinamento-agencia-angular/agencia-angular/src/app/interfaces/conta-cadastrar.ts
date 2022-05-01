import { iCliente } from "./cliente";


export interface iContaCadastrar {
  id?: number;
  agencia: string;
  numero: string;
  saldo: number;
  cliente? : iCliente;
}
