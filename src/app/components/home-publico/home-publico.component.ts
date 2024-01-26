import { Component, OnInit } from '@angular/core';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';
import { CharlasService } from 'src/app/services/charlas.service';
import { CharlaQT } from 'src/app/models/charlaQT.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TechRiderQT } from 'src/app/models/techridersQT.model';
import { ValoracionesCharlasService } from 'src/app/services/valoraciones-charlas.service';
import { ValoracionCharla } from 'src/app/models/valoracion-charla.model';

@Component({
  selector: 'app-home-publico',
  templateUrl: './home-publico.component.html',
  styleUrls: ['./home-publico.component.css']
})
export class HomePublicoComponent {

  public empresas!: Array<EmpresaCentro>
  public centros!: Array<EmpresaCentro>
  public charlas!: Array<CharlaQT>
  public trs!: Array<TechRiderQT>
  public valoraciones!: Array<ValoracionCharla>

  // public empresas: EmpresaCentro[] = [];
  constructor(
    private _empresasCentrosService: EmpresasCentrosService,
    private _charlasService: CharlasService,
    private _usuariosService: UsuariosService,
    private _valoracionesService: ValoracionesCharlasService
    ) {}

  ngOnInit(): void {
    
    this._charlasService.getCharlasDetalles().subscribe((response: Array<CharlaQT>)=>{
      this.charlas = response
      // console.log(response)
    });

    this._usuariosService.getTechRiders().subscribe((response: Array<TechRiderQT>)=>{
      this.trs = response
      // console.log(response)
    });


    this._empresasCentrosService.getEmpresas().subscribe(
      (empresasFiltradas: EmpresaCentro[]) => {
        this.empresas = empresasFiltradas;
        // console.log(empresasFiltradas);
      });

    this._empresasCentrosService.getCentros().subscribe(
      (centrosFiltrados: EmpresaCentro[]) => {
        this.centros = centrosFiltrados;
        // console.log(centrosFiltrados);
      });

      this._valoracionesService.getValoracionesCharlas().subscribe((response: Array<ValoracionCharla>)=>{
          this.valoraciones = response
          console.log(this.valoraciones)
        });
   
  }
}
