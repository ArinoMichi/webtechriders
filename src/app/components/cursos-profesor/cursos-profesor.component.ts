import { Component, OnInit } from '@angular/core';
import { CursoDetalles } from 'src/app/models/curso-detalles.model';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos-profesor',
  templateUrl: './cursos-profesor.component.html',
  styleUrls: ['./cursos-profesor.component.css']
})
export class CursosProfesorComponent implements OnInit{

  public cursos!: Array<CursoDetalles>
  public identity: any
  public token: any

  constructor(
    private _CursosService: CursosService
  ){
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}')
    this.token = localStorage.getItem('token')
  }
  ngOnInit(): void {
    this._CursosService.getAllCursosFromProfesor(this.identity.idUsuario).subscribe((response) => {
      this.cursos = response;
    })
  }
}
