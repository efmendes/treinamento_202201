import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }

  clientes:any = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.clienteService.listarClientes().subscribe((result: any) => {

      this.clientes = result;
      console.log(this.clientes)

    });
  }

}
