
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iConta } from 'src/app/interfaces/conta';
import { iContaCadastrar } from 'src/app/interfaces/conta-cadastrar';
import { ISaqueDeposito } from 'src/app/interfaces/saque-deposito';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sacar-depositar',
  templateUrl: './sacar-depositar.component.html',
  styleUrls: ['./sacar-depositar.component.css']
})
export class SacarDepositarComponent implements OnInit {

  sacqueDeposito : ISaqueDeposito = {
    agencia : '',
    numeroConta : '',
    valor : 0
  }

  emptyconta : iContaCadastrar = {
    id: 0,
    agencia: '',
    numero: '',
    saldo: 0,
  }

  formSaqueDeposito : FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router, private contasService: ContasService) { }


  ngOnInit(): void {

    const id = Number(this.activatedRoute.snapshot.paramMap.get('id')); //id da conta
    //console.log('ID: ',id);


    if(id){
      this.contasService.buscarContaId(id).subscribe((result: iConta) => {
        //console.log(result);
        this.formSaqueDeposito = this.preencherFormulario(result);
      }, error => {
        console.log('Erro ao buscar conta: ',error);
      });
    }

  }

  preencherFormulario(conta : iConta): FormGroup {
    return new FormGroup({
      agencia : new FormControl(conta.agencia ? conta.agencia : '', Validators.required),
      numero : new FormControl(conta.numero ? conta.numero : '', Validators.required),
      valor : new FormControl(0, Validators.required)
    });
  }

  sacarDepositar(){
    const saqueDeposito: ISaqueDeposito = {
      agencia: this.formSaqueDeposito.get('agencia')?.value,
      numeroConta: this.formSaqueDeposito.get('numero')?.value,
      valor: this.formSaqueDeposito.get('valor')?.value
    }

    const caminho = this.activatedRoute.snapshot.routeConfig?.path; //path do serviço
    //console.log(caminho);

    if (caminho === 'contas/sacar/:id'){
      this.contasService.sacar(saqueDeposito).subscribe(result => {
        Swal.fire('Sucesso', "Saque Feito Com Sucesso" , 'success');
        this.router.navigate(['/contas']);
        console.log(result);
      });
    }else{
      this.contasService.depositar(saqueDeposito).subscribe(result => {
        Swal.fire('Sucesso', "Depósito Feito Com Sucesso" , 'success');
        this.router.navigate(['/contas']);
        console.log(result);
      });
    }
  }

}
