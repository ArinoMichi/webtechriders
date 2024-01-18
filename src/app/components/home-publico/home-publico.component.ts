import { Component, OnInit } from '@angular/core';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';

@Component({
  selector: 'app-home-publico',
  templateUrl: './home-publico.component.html',
  styleUrls: ['./home-publico.component.css']
})
export class HomePublicoComponent {

  public empresas!: Array<EmpresaCentro>

  constructor(private _empresasCentrosService: EmpresasCentrosService) {}

  ngOnInit(): void {
    this._empresasCentrosService.getEmpresas().subscribe(
      (response: Array<EmpresaCentro>)=>{
        this.empresas = response
        console.log(response)
      }
    );
  }
}
