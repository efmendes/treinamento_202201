import { Component, OnInit } from '@angular/core';
import { iConta } from 'src/app/interfaces/conta';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.css']
})
export class ContasComponent implements OnInit {

  constructor(private contaService: ContasService) { }

  contas: iConta[] = []

  ngOnInit(): void {

    this.listarTodos();

  }

  listarTodos(){
    this.contaService.listarContas().subscribe((result: iConta[])=>{
      this.contas = result;
      console.log(this.contas)
    })
  }

  excluir(id : number){
    Swal.fire({
      title: 'Deseja realmente remover?',
      text: "A Conta será removido permanentemente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contaService.remover(id).subscribe(result => {
          Swal.fire({
            title: 'Removida',
            text: "A Conta foi removida com sucesso",
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
