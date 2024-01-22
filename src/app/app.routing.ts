import { HomeComponent } from './components/home/home.component';
//NECESITAMOS LOS SIGUIENTES MODULOS PARA REALIZAR LA DECLARACION
//DE NAVEGACION
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { CalendarioComponent } from './components/calendario/calendario.component';

//DEFINIMOS UN ARRAY CON NUESTRAS RUTAS PARA LOS COMPONENTS
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-usuarios', component: RegistroUsuariosComponent },
  { path: 'calendar', component: CalendarioComponent },
];
//DESDE ROUTING DEBEMOS EXPORTAR DOS CARACTERISTICAS PARA IMPLEMENTARLAS
//DENTRO DEL MODULE
//EL PROVEEDOR DE RUTAS
export const appRoutingProvider: any[] = [];
//EL MODULO ROUTING INDICANDO EL ARRAY DE RUTAS DECLARADO
export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(appRoutes);
