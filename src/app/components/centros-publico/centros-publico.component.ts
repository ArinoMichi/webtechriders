import { Component } from '@angular/core';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';

@Component({
  selector: 'app-centros-publico',
  templateUrl: './centros-publico.component.html',
  styleUrls: ['./centros-publico.component.css']
})
export class CentrosPublicoComponent {
  public centros !: Array<EmpresaCentro>

  constructor(
    private _empresasCentrosService: EmpresasCentrosService
    ) {}

    ngOnInit(): void {
      this._empresasCentrosService.getCentros().subscribe(
        (centrosFiltrados: EmpresaCentro[]) => {
          this.centros = centrosFiltrados;
          console.log(centrosFiltrados);
        });
    }
}
