import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroEdicaoComponent } from './pages/clientes/cadastro-edicao/cadastro-edicao.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CadastrarEditarComponent } from './pages/contas/cadastrar-editar/cadastrar-editar.component';
import { ContasComponent } from './pages/contas/contas.component';
import { SacarDepositarComponent } from './pages/contas/sacar-depositar/sacar-depositar.component';
import { TransferirComponent } from './pages/contas/transferir/transferir.component';

//ADICIONRAR ROTAS DAS APPS
const routes: Routes = [
  { path: 'clientes', component: ClientesComponent},
  { path: 'contas', component: ContasComponent },
  { path: 'clientes/cadastrar', component: CadastroEdicaoComponent },
  { path: 'clientes/editar/:id', component: CadastroEdicaoComponent},
  { path: 'contas/cadastrar', component: CadastrarEditarComponent },
  { path: 'contas/editar/:id', component: CadastrarEditarComponent },
  { path: 'contas/sacar/:id', component: SacarDepositarComponent },
  { path: 'contas/depositar/:id', component: SacarDepositarComponent },
  { path: 'contas/transferir/:id', component: TransferirComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
