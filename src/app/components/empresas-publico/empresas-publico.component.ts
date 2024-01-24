import { Component } from '@angular/core';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TechRiderQT } from 'src/app/models/techridersQT.model';

@Component({
  selector: 'app-empresas-publico',
  templateUrl: './empresas-publico.component.html',
  styleUrls: ['./empresas-publico.component.css']
})
export class EmpresasPublicoComponent {
  imageUrlQuienesSomos = 'https://image.freepik.com/foto-gratis/grupo-personas-trabajando-plan-negocios-oficina_1303-15779.jpg';

  public empresas!: Array<EmpresaCentro>
  public trs!: Array<TechRiderQT>

  constructor(
    private _empresasCentrosService: EmpresasCentrosService,
    private _usuariosService: UsuariosService
    ) {}

    ngOnInit(): void {
      this._empresasCentrosService.getEmpresas().subscribe(
        (empresasFiltradas: EmpresaCentro[]) => {
          this.empresas = empresasFiltradas;
          console.log(empresasFiltradas);
        });

    }

    selectCompany(idEmpresa: number): void {
      this._usuariosService.getFindTechRidersEnEmpresa(idEmpresa).subscribe(
        (techRiders: any) => {
          this.trs = techRiders;
          console.log(techRiders);
        });
    }
  }
  
