import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { routing,appRoutingProvider } from './app.routing';
import { FooterComponent } from './components/footer/footer.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { LoginComponent } from './components/login/login.component';
import { HomePublicoComponent } from './components/home-publico/home-publico.component';
import { TrPublicoComponent } from './components/tr-publico/tr-publico.component';
import { EmpresasPublicoComponent } from './components/empresas-publico/empresas-publico.component';
import { CentrosPublicoComponent } from './components/centros-publico/centros-publico.component';
import { CharlasPublicoComponent } from './components/charlas-publico/charlas-publico.component';
import { NavbarPublicoComponent } from './components/navbar-publico/navbar-publico.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactanosComponent,
    FooterComponent,
    QuienesSomosComponent,
    LoginComponent,
    HomePublicoComponent,
    TrPublicoComponent,
    EmpresasPublicoComponent,
    CentrosPublicoComponent,
    CharlasPublicoComponent,
    NavbarPublicoComponent
  ],
  imports: [
    BrowserModule, HttpClientModule , routing
  ],
  providers: [appRoutingProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
