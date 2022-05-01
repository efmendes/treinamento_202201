import { Component, OnInit } from '@angular/core';
import { iCliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  constructor(private clienteService: ClientesService) { }

  clientes: iCliente[] = [];

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(){
    this.clienteService.listarClientes().subscribe((result: iCliente[]) => {

      this.clientes = result;
      console.log(this.clientes)

    });
  }

  confirmar(id: number){
    Swal.fire({
      title: 'Deseja realmente remover?',
      text: "O cliente será removido permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.removerCliente(id).subscribe(result => {
          Swal.fire({
            title: 'Removido',
            text: "O cliente foi removido com sucesso",
            icon: 'success',
          });
          this.listarTodos();
        }, error => {
          console.log(error);
        });
      }
    })
  }

}
