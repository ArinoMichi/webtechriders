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
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { PaneltrComponent } from './components/paneltr/paneltr.component';
import {
  CalendarModule,
  DateAdapter,
  CalendarNativeDateFormatter,
  DateFormatterParams,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomDateFormatter } from './custom-date-formatter';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CharlaDetalleComponent } from './components/charla-detalle/charla-detalle.component';
import { HomePublicoComponent } from './components/home-publico/home-publico.component';
import { TrPublicoComponent } from './components/tr-publico/tr-publico.component';
import { EmpresasPublicoComponent } from './components/empresas-publico/empresas-publico.component';
import { CentrosPublicoComponent } from './components/centros-publico/centros-publico.component';
import { CharlasPublicoComponent } from './components/charlas-publico/charlas-publico.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactanosComponent,
    FooterComponent,
    QuienesSomosComponent,
    LoginComponent,
    RegistroUsuariosComponent,
    PaneltrComponent,
    CalendarioComponent,
    CharlaDetalleComponent,
    HomePublicoComponent,
    TrPublicoComponent,
    EmpresasPublicoComponent,
    CentrosPublicoComponent,
    CharlasPublicoComponent,
    PanelAdminComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NoopAnimationsModule,
    MatDialogModule,
    MatIconModule
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
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEs); // Registra la configuración regional para español
  }
}
