import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iCliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  api = environment.api;
  endpoint = 'clientes';
  constructor(private http: HttpClient) { }

  listarClientes(){
    return this.http.get<iCliente[]>(`${this.api}/${this.endpoint}/`);
  }

  cadastrarEditarCliente(cliente: iCliente){
    if(cliente.id){
      return this.http.put(`${this.api}/${this.endpoint}/${cliente.id}`, cliente);
    }
    return this.http.post(`${this.api}/${this.endpoint}/`, cliente);
  }

  removerCliente(id:number){
    return this.http.delete(`${this.api}/${this.endpoint}/${id}`);
  }

  buscarPorIdCliente(id: number): Observable<iCliente>{
    return this.http.get<iCliente>(`${this.api}/${this.endpoint}/${id}`);
  }
}
