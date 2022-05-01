import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { iConta } from '../interfaces/conta';
import { ISaqueDeposito } from 'src/app/interfaces/saque-deposito';
import { ITransferencia } from '../interfaces/tranferencia';
import { iContaCadastrar } from '../interfaces/conta-cadastrar';


@Injectable({
  providedIn: 'root'
})
export class ContasService {
  api = environment.api;
  endpoint = 'contas';
  saque = 'saque';
  deposito = 'deposito';
  transferencia = 'transferencia';


  constructor(private http: HttpClient) { }

  listarContas(){
    return this.http.get<iConta[]>(`${this.api}/${this.endpoint}/`);
  }

  salvarConta(conta:iContaCadastrar){

    return this.http.post(`${this.api}/${this.endpoint}/`, conta);
  }

  editar(conta:iContaCadastrar){
    return this.http.put(`${this.api}/${this.endpoint}/${conta.id}/`, conta);
  }

  remover(id:number){
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarContaId(id: number){

    return this.http.get<iConta>(`${this.api}/${this.endpoint}/${id}`);

  }

  sacar(saqueDeposito: ISaqueDeposito){
    //console.log('Service Sacar: ',saqueDeposito);
    return this.http.put(`${this.api}/${this.endpoint}/${this.saque}/`, saqueDeposito);
  }

  depositar(saqueDeposito: ISaqueDeposito){
    return this.http.put(`${this.api}/${this.endpoint}/${this.deposito}/`, saqueDeposito);
  }

  transferir(tranferencia: ITransferencia){
    return this.http.put(`${this.api}/${this.endpoint}/${this.transferencia}/`, tranferencia);
  }



}
