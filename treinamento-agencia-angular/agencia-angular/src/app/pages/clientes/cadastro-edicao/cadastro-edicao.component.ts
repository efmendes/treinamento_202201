import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iCliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-edicao',
  templateUrl: './cadastro-edicao.component.html',
  styleUrls: ['./cadastro-edicao.component.css']
})
export class CadastroEdicaoComponent implements OnInit {

  cliente: iCliente = {
    id: 0,
    nome: '',
    cpf: '',
    email: '',
    observacoes: '',
    ativo: true
  }

  formGroupCliente: FormGroup = this.preencherFormulario(this.cliente);

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id);


    if(Number(id)){
      this.clienteService.buscarPorIdCliente(id).subscribe((result: iCliente) => {
        console.log(result);
        this.formGroupCliente = this.preencherFormulario(result);
      }, error => { console.error(error) });
    }
  }

  preencherFormulario(cliente: iCliente): FormGroup{
    return new FormGroup({
      id: new FormControl(cliente.id ? cliente.id : null),
      nome: new FormControl(cliente.nome, Validators.required),
      cpf: new FormControl(cliente.cpf, Validators.required),
      email: new FormControl(cliente.email, [Validators.required, Validators.email]),
      observacoes: new FormControl(cliente.observacoes),
      ativo: new FormControl(cliente.ativo),
    });
  }

  enviar(){
    const cliente: iCliente = this.formGroupCliente.value;
    this.clienteService.cadastrarEditarCliente(cliente).subscribe(result => {
      console.log(result);
      Swal.fire('Sucesso', `${this.isEditando() ? 'Editado' : 'Cadastrado'} com sucesso!` , 'success');
      this.router.navigate(['/clientes']);
    });

  }

  isEditando(){
    return !!this.formGroupCliente.get("id")?.value;
  }

}
