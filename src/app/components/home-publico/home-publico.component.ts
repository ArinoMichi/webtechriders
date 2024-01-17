import { Component, OnInit } from '@angular/core';
import { TipoEmpresaService } from 'src/app/services/tipo-empresa.service';

@Component({
  selector: 'app-home-publico',
  templateUrl: './home-publico.component.html',
  styleUrls: ['./home-publico.component.css']
})
export class HomePublicoComponent {

  tiposEmpresas: any[] = [];

  constructor(private tipoEmpresasService: TipoEmpresaService) {}

  ngOnInit(): void {
    this.tipoEmpresasService.getTiposEmpresas().subscribe(
      (empresasFiltradas: any) => {
        this.tiposEmpresas = empresasFiltradas;
      },
      error => {
        console.error('Error al obtener los tipos de empresas:', error);
      }
    );
  }
}
