import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoProfesor } from 'src/app/models/curso-profesor.model';
import { Curso } from 'src/app/models/curso.model';
import { EmpresaTechRider } from 'src/app/models/empresa-techrider';
import { CursosProfesoresService } from 'src/app/services/cursos-profesores.service';
import { CursosService } from 'src/app/services/cursos.service';
import { EmpresasCentrosService } from 'src/app/services/empresas-centros.service';

@Component({
  selector: 'app-formulario-curso',
  templateUrl: './formulario-curso.component.html',
  styleUrls: ['./formulario-curso.component.css']
})
export class FormularioCursoComponent implements OnInit{
  @ViewChild('cajacentro') cajaCentroRef!: ElementRef
  @ViewChild('cajanombre') cajaNombreRef!: ElementRef
  @ViewChild('cajadescripcion') cajaDescripcionRef!: ElementRef

  public centros!: Array<EmpresaTechRider>
  public curso!: Curso
  public cursoProfesor!: CursoProfesor
  public identity: any
  public token: any

  constructor(
    private _cursosService: CursosService,
    private _empresasCentrosService: EmpresasCentrosService,
    private _cursosProfesoresService: CursosProfesoresService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}')
    this.token = localStorage.getItem('token')
    this.curso = new Curso(0, null, "", "" )
  }

  ngOnInit(): void {
    this._empresasCentrosService.findEmpresaTechRider(this.identity.idUsuario).subscribe(response => {
      this.centros = response
      console.log(this.centros)
    })
    this._route.params.subscribe(params => {
      let id = +params['id'];
      if(id){
        this._cursosService.getCurso(id).subscribe(response => {
          this.curso = response
        })
      }
    })
  }

  enviarCurso(){

    var centro = this.cajaCentroRef.nativeElement.value
    var nombre = this.cajaNombreRef.nativeElement.value
    var descripcion = this.cajaDescripcionRef.nativeElement.value

    console.log(centro)

    this._route.params.subscribe(params => {
      let id = +params['id'];
      if(id){
        this.curso = new Curso (id, parseInt(centro), nombre, descripcion)
        console.log(this.curso)
        this._cursosService.updateCurso(this.curso, this.token).subscribe((response) => {
          console.log(response)
        })  
      } else {
        this.curso = new Curso (0, parseInt(centro), nombre, descripcion)
        console.log(this.curso)
        this._cursosService.insertCurso(this.curso, this.token).subscribe((response) => {
          console.log(response)
        })  
      }
    }) 
  }
}

