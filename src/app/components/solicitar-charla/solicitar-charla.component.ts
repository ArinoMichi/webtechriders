import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Provincia } from 'src/app/models/provincia.model';
import { Charla } from 'src/app/models/charla.model';

@Component({
  selector: 'app-solicitar-charla',
  templateUrl: './solicitar-charla.component.html',
  styleUrls: ['./solicitar-charla.component.css']
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
  public charla!: Charla

  constructor(
    private _ProvinciasService: ProvinciasService,
  )
  {}

  ngOnInit(): void {
    this._ProvinciasService.getProvincias().subscribe((response) => {
      this.provincias = response;
    });
  }

  enviarCharla(): void {
    var descripcion = this.cajaDescripcionRef.nativeElement.value
    var fecha: Date = this.cajaFechaRef.nativeElement.value
    var observaciones = this.cajaObservacionesRef.nativeElement.value
    var fechaSolicitud: Date = new Date()
    var turno = this.cajaTurnoRef.nativeElement.value
    var modalidad = this.cajaModalidadRef.nativeElement.value
    var curso = this.cajaCursoRef.nativeElement.value
    var provincia = this.cajaProvinciaRef.nativeElement.value

    this.charla = new Charla (0, descripcion, 2, fecha, observaciones, 0, 
      fechaSolicitud, turno, modalidad, "", curso, provincia)

  }
}