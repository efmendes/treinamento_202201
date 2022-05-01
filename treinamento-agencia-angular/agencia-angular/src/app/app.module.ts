import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';




import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ContasComponent } from './pages/contas/contas.component';
import { CadastroEdicaoComponent } from './pages/clientes/cadastro-edicao/cadastro-edicao.component';
import { SacarDepositarComponent } from './pages/contas/sacar-depositar/sacar-depositar.component';
import { CadastrarEditarComponent } from './pages/contas/cadastrar-editar/cadastrar-editar.component';
import { TransferirComponent } from './pages/contas/transferir/transferir.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    ContasComponent,
    CadastroEdicaoComponent,
    SacarDepositarComponent,
    CadastrarEditarComponent,
    TransferirComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
