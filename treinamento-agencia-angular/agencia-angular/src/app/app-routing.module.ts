import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';

//ADICIONRAR ROTAS DAS APPS
const routes: Routes = [
  {
    path: 'clientes', component: ClientesComponent
  },
  {
    path: 'contas', component: ContasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
