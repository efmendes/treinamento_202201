import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iCliente } from 'src/app/interfaces/cliente';
import { iContaCadastrar } from 'src/app/interfaces/conta-cadastrar';
import { ClientesService } from 'src/app/services/clientes.service';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar-editar',
  templateUrl: './cadastrar-editar.component.html',
  styleUrls: ['./cadastrar-editar.component.css']
})
export class CadastrarEditarComponent implements OnInit {

  conta:iContaCadastrar = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
  }

  clientes: iCliente[] = [];
  contaEditar: any = null;
  cliente: any = null;

  formGroupConta: FormGroup = this.preencherFormularioConta(this.conta);

  constructor(private clienteService: ClientesService,
              private contaService: ContasService,
              private router: Router,
              private activatedRoute: ActivatedRoute){ }


  ngOnInit(): void {

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if(id){
      this.buscarContaId(id);
    }else{
      this.listarClientes();
    }
  }

  //Editar Conta
  buscarContaId(id:number){
    this.contaService.buscarContaId(id).subscribe(result => {
      this.contaEditar = result;
      this.formGroupConta.get('id')?.setValue(result.id);
      this.formGroupConta.get('agencia')?.setValue(result.agencia);
      this.formGroupConta.get('numero')?.setValue(result.numero);
      this.formGroupConta.get('saldo')?.setValue(result.saldo);
      //this.formGroupConta.get('cliente')?.setValue(result.cliente.nome);
      this.cliente = { id: result.cliente.id }
    });
  }

  //preencher formulário
  preencherFormularioConta(conta: iContaCadastrar): FormGroup {
    return new FormGroup({
      id: new FormControl(conta.id ? conta.id : null),
      agencia: new FormControl(conta.agencia ? conta.agencia : '',Validators.required),
      numero: new FormControl(conta.numero ? conta.numero : '', Validators.required),
      saldo: new FormControl(conta.saldo ? conta.saldo : '',Validators.required),
      cliente: new FormControl(null, Validators.required)
    });
  }

  listarClientes(){
    this.clienteService.listarClientes().subscribe((result: iCliente[]) => {
      this.clientes = result;
      console.log(this.clientes)
    });
  }

  enviar(){
    if(!this.cliente){
      this.cliente = { id: this.formGroupConta.get('cliente')?.value }
    }
    const conta: iContaCadastrar = {
      id: this.formGroupConta.get('id')?.value,
      agencia : this.formGroupConta.get('agencia')?.value,
      numero : this.formGroupConta.get('numero')?.value,
      saldo: this.formGroupConta.get('saldo')?.value,
      cliente: this.cliente as iCliente
    }

    console.log(conta);
    if(!this.contaEditar){
      this.contaService.salvarConta(conta).subscribe(result => {
        Swal.fire('Sucesso', "Conta Cadastrada Com Sucesso" , 'success');
          this.router.navigate(['/contas']);
          console.log(result);
      });
    }

    this.contaService.editar(conta).subscribe(result => {
      Swal.fire('Sucesso', "Conta Editada Com Sucesso" , 'success');
      this.router.navigate(['/contas']);
      console.log(result);
    });


  }

}
