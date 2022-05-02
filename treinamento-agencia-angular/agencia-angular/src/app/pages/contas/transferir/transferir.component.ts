
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iConta } from 'src/app/interfaces/conta';
import { ITransferencia } from 'src/app/interfaces/tranferencia';
import { ContasService } from 'src/app/services/contas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {

  transferencia : ITransferencia = {
    agenciaDestino : '',
    agenciaOrigem : '',
    numeroContaDestino : '',
    numeroContaOrigem : '',
    valor : 0
  }

  formTransferencia : FormGroup = this.preencherFormulario(this.transferencia);
  contas : iConta[] = [];
  contaSelecionada: any = null;
  contaDestinoSelecionada: any = null;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router, private contasService: ContasService) { }


  ngOnInit(): void {

    this.listarContas();
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id')); //id da conta origem
    console.log('ID: ',typeof(id));

    this.buscarContaId(id);
  }

  //listar contas

  listarContas(){
    this.contasService.listarContas().subscribe((result: iConta[]) =>{
      this.contas = result;
      console.log('Transferir: ',this.contas);
    });

  }

  //listar conta selecionada
  buscarContaId(id: number){
    this.contasService.buscarContaId(id).subscribe(result => {
      this.contaSelecionada = result;
      console.log('Conta -- ', result);
      //preencer o campo
      this.formTransferencia.get('nome')?.setValue(result.cliente.nome);
      this.formTransferencia.get('nome')?.disable();

      this.formTransferencia.get('agenciaOrigem')?.setValue(result.agencia);
      this.formTransferencia.get('agenciaOrigem')?.disable();

      this.formTransferencia.get('numeroContaOrigem')?.setValue(result.numero);
      this.formTransferencia.get('numeroContaOrigem')?.disable();
      //this.formTransferencia.get('clienteDestino')?.setValue(result.cliente.nome);
    });
  }

  //buscar Cliente de Destino
  buscarClienteDestino(id: number){

  }


  //preencher formulário
  preencherFormulario(transferencia : ITransferencia): FormGroup {
    return new FormGroup({
      nome : new FormControl('', Validators.required),
      agenciaOrigem : new FormControl(transferencia.agenciaOrigem ? transferencia.agenciaOrigem : '', Validators.required),
      numeroContaOrigem : new FormControl(transferencia.numeroContaOrigem ? transferencia.numeroContaOrigem : '', Validators.required),
      agenciaDestino : new FormControl(transferencia.agenciaDestino ? transferencia.agenciaDestino : '', Validators.required),
      numeroContaDestino : new FormControl(transferencia.numeroContaDestino ? transferencia.numeroContaDestino: '', Validators.required),
      valor : new FormControl('', Validators.required),
    });
  }

  transferir(){
    const transferencia : ITransferencia = {
      agenciaDestino : this.formTransferencia.get('agenciaDestino')?.value,
      agenciaOrigem : this.formTransferencia.get('agenciaOrigem')?.value,
      numeroContaDestino : this.formTransferencia.get('numeroContaDestino')?.value,
      numeroContaOrigem : this.formTransferencia.get('numeroContaOrigem')?.value,
      valor : this.formTransferencia.get('valor')?.value
    }

    this.contasService.transferir(transferencia).subscribe(result => {
      Swal.fire('Sucesso', "Trânsferência Feita Com Sucesso" , 'success');
        this.router.navigate(['/contas']);
        console.log(result);
    });
  }

}
