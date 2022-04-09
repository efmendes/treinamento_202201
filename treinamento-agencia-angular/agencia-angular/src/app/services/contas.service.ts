import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContasService {
  api = environment.api;
  endpoint = 'contas';

  constructor(private http: HttpClient) { }

  listarContas(){
    return this.http.get(`${this.api}/${this.endpoint}/`)
  }
}
