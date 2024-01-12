import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { routing,appRoutingProvider } from './app.routing';
import { FooterComponent } from './components/footer/footer.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { LoginComponent } from './components/login/login.component';
import { CharlasComponent } from './components/charlas/charlas.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactanosComponent,
    FooterComponent,
    QuienesSomosComponent,
    LoginComponent,
    CharlasComponent
  ],
  imports: [
    BrowserModule, routing
  ],
  providers: [appRoutingProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
