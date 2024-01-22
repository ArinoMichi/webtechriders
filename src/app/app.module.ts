import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { routing, appRoutingProvider } from './app.routing';
import { FooterComponent } from './components/footer/footer.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { LoginComponent } from './components/login/login.component';
import { CharlasComponent } from './components/charlas/charlas.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { PaneltrComponent } from './components/paneltr/paneltr.component';
import { CalendarModule, DateAdapter, CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomDateFormatter } from './custom-date-formatter';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CharlaDetalleComponent } from './components/charla-detalle/charla-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactanosComponent,
    FooterComponent,
    QuienesSomosComponent,
    LoginComponent,
    CharlasComponent,
    RegistroUsuariosComponent,
    PaneltrComponent,
    CalendarioComponent,
    CharlaDetalleComponent,
  ],
  imports: [
    BrowserModule, 
    routing, 
    HttpClientModule, 
    FormsModule, 
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }), 
    NoopAnimationsModule, 
    MatDialogModule,
  ],
  providers: [
    appRoutingProvider, 
    {
      provide: CalendarNativeDateFormatter,
      useClass: CustomDateFormatter,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es', // Establece el idioma en español
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs);  // Registra la configuración regional para español
  }
}
