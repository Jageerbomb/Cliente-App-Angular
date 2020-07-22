import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DirectivaComponent} from './directiva/directiva.component';
import {ClientesComponent} from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import {RouterModule, Routes} from '@angular/router';
import {ClienteFormComponent} from './clientes/cliente-form/cliente-form.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: '', redirectTo: './clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: ClienteFormComponent},
  {path: 'clientes/form/:id', component: ClienteFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    ClienteFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
