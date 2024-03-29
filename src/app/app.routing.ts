import { HomeComponent } from './components/home/home.component';
//NECESITAMOS LOS SIGUIENTES MODULOS PARA REALIZAR LA DECLARACION
//DE NAVEGACION
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ContactanosComponent } from './components/contactanos/contactanos.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuariosComponent } from './components/registro-usuarios/registro-usuarios.component';
import { RegistroCentroEmpresasComponent } from './components/registro-centro-empresas/registro-centro-empresas.component';
import { PaneltrComponent } from './components/paneltr/paneltr.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { HomePublicoComponent } from './components/home-publico/home-publico.component';
import { TrPublicoComponent } from './components/tr-publico/tr-publico.component';
import { EmpresasPublicoComponent } from './components/empresas-publico/empresas-publico.component';
import { CentrosPublicoComponent } from './components/centros-publico/centros-publico.component';
import { CharlasPublicoComponent } from './components/charlas-publico/charlas-publico.component';
import { SolicitarCharlaComponent } from './components/solicitar-charla/solicitar-charla.component';
import { CursosProfesorComponent } from './components/cursos-profesor/cursos-profesor.component';
import { FormularioCursoComponent } from './components/formulario-curso/formulario-curso.component';
import { PeticionesUsuariosComponent } from './components/peticiones-usuarios/peticiones-usuarios.component';
import { PeticionesEmpresasComponent } from './components/peticiones-empresas/peticiones-empresas.component';
import { PeticionesTecnologiasComponent } from './components/peticiones-tecnologias/peticiones-tecnologias.component';

import { UserTrComponent } from './components/user-tr/user-tr.component';
import { ProfesorCharlasComponent } from './components/profesor-charlas/profesor-charlas.component';
import { RepresentanteCharlasComponent } from './components/representante-charlas/representante-charlas.component';

//DEFINIMOS UN ARRAY CON NUESTRAS RUTAS PARA LOS COMPONENTS
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-usuarios', component: RegistroUsuariosComponent },
  { path: 'panel-tr', component: PaneltrComponent },
  { path: 'calendar', component: CalendarioComponent },
  { path: 'publico', component: HomePublicoComponent },
  { path: 'tr-publico', component: TrPublicoComponent },
  { path: 'tr-publico/:idEmpresa', component: TrPublicoComponent },
  { path: 'empresas-publico', component: EmpresasPublicoComponent },
  { path: 'centros-publico', component: CentrosPublicoComponent  },
  { path: 'charlas-publico', component: CharlasPublicoComponent  },
  { path: 'solicitar-charla', component: SolicitarCharlaComponent },
  { path: 'editar-charla/:id', component: SolicitarCharlaComponent},
  { path: 'cursos-profesor', component: CursosProfesorComponent},
  { path: 'crear-curso', component: FormularioCursoComponent},
  { path: 'modificar-curso/:id', component: FormularioCursoComponent},
  { path: 'centros-publico', component: CentrosPublicoComponent },
  { path: 'peticiones-usuarios', component: PeticionesUsuariosComponent },
  { path: 'peticiones-empresascentros', component: PeticionesEmpresasComponent },
  { path: 'peticiones-tecnologias', component: PeticionesTecnologiasComponent },
  { path: 'registo-empresascentros', component: RegistroCentroEmpresasComponent },
  { path: 'user-tr', component: UserTrComponent },
  { path: 'profesor-charlas', component: ProfesorCharlasComponent},
  { path: 'representante-tr-charlas/:id', component: RepresentanteCharlasComponent}
];
//DESDE ROUTING DEBEMOS EXPORTAR DOS CARACTERISTICAS PARA IMPLEMENTARLAS
//DENTRO DEL MODULE
//EL PROVEEDOR DE RUTAS
export const appRoutingProvider: any[] = [];
//EL MODULO ROUTING INDICANDO EL ARRAY DE RUTAS DECLARADO
export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(appRoutes);
