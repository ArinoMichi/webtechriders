import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/models/provincia.model';
import { Charla } from 'src/app/models/charla.model';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';
import { CharlasService } from 'src/app/services/charlas.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-charla',
  templateUrl: './solicitar-charla.component.html',
  styleUrls: ['./solicitar-charla.component.css'],
  providers: [DatePipe]
})
export class SolicitarCharlaComponent implements OnInit{
  @ViewChild('cajadescripcion') cajaDescripcionRef!: ElementRef
  @ViewChild('cajafecha') cajaFechaRef!: ElementRef
  @ViewChild('cajaobservaciones') cajaObservacionesRef!: ElementRef
  @ViewChild('cajaturno') cajaTurnoRef!: ElementRef
  @ViewChild('cajamodalidad') cajaModalidadRef!: ElementRef
  @ViewChild('cajacurso') cajaCursoRef!: ElementRef
  @ViewChild('cajaprovincia') cajaProvinciaRef!: ElementRef

  public provincias!: Array<Provincia>
  public cursos!: Array<Curso>
  public charla!: Charla
  public identity: any
  public token: any

  constructor(
    private _ProvinciasService: ProvinciasService,
    private _CursosService: CursosService,
    private _CharlasService: CharlasService,
    private datePipe: DatePipe,
    private _router: Router,
    private _route: ActivatedRoute
  )
  {
    this.identity = JSON.parse(localStorage.getItem('identity') || '{}')
    this.token = localStorage.getItem('token')
    this.charla = new Charla(0, "", 0, "", "", null, "", "", "", "", 0, 0)
  }

  ngOnInit(): void {
    this._ProvinciasService.getProvincias().subscribe((response) => {
      this.provincias = response;
    });
    this._CursosService.getAllCursosFromProfesor(this.identity.idUsuario).subscribe((response) => {
      this.cursos = response;
    })
    this._route.params.subscribe(params => {
      let id = +params['id'];
      if(id){
        this._CharlasService.getCharla(id).subscribe((response) => {
          this.charla = response
        })
      }
    })
  }

  enviarCharla(): void {

    var descripcion = this.cajaDescripcionRef.nativeElement.value
    var fecha = this.datePipe.transform(this.cajaFechaRef.nativeElement.value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    var observaciones = this.cajaObservacionesRef.nativeElement.value
    var fechaSolicitud = new Date().toISOString();
    var turno = this.cajaTurnoRef.nativeElement.value
    var modalidad = this.cajaModalidadRef.nativeElement.value
    var curso = this.cajaCursoRef.nativeElement.value
    var provincia = this.cajaProvinciaRef.nativeElement.value

    this.charla = new Charla (0, descripcion, 2, fecha, observaciones, null, 
      fechaSolicitud, turno, modalidad, "", parseInt(curso), parseInt(provincia))

      console.log(this.charla)

    this._CharlasService.insertCharla(this.charla, this.token).subscribe((response) => {
      console.log(response)
      
    })  
  }

  modificarCharla(): void {
    var descripcion = this.cajaDescripcionRef.nativeElement.value
    var fecha = this.datePipe.transform(this.cajaFechaRef.nativeElement.value, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    var observaciones = this.cajaObservacionesRef.nativeElement.value
    var fechaSolicitud = new Date().toISOString();
    var turno = this.cajaTurnoRef.nativeElement.value
    var modalidad = this.cajaModalidadRef.nativeElement.value
    var curso = this.cajaCursoRef.nativeElement.value
    var provincia = this.cajaProvinciaRef.nativeElement.value

    this.charla = new Charla (0, descripcion, 2, fecha, observaciones, null, 
      fechaSolicitud, turno, modalidad, "", parseInt(curso), parseInt(provincia))

      this._CharlasService.updateCharla(this.charla, this.token).subscribe((response) => {
        console.log(response)
        this._router.navigate(['/'])
      })
  }
}