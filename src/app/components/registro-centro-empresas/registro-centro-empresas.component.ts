import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ProvinciasService } from 'src/app/services/provincias.service';
import { EmpresaCentroService } from 'src/app/services/empresa-centro.service';

import { PeticionesAltaCentroEmpresa } from 'src/app/services/peticiones-alta-centroempresa.service';

import { Provincia } from 'src/app/models/provincia.model';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-centro-empresas',
  templateUrl: './registro-centro-empresas.component.html',
  styleUrls: ['./registro-centro-empresas.component.css']
})
export class RegistroCentroEmpresasComponent implements OnInit {
  @ViewChild('cajanombre') cajaNombreRef!: ElementRef;
  @ViewChild('cajadireccion') cajaDireccionRef!: ElementRef;
  @ViewChild('cajatelefono') cajaTelefonoRef!: ElementRef;
  @ViewChild('cajapersonacontacto') cajaPersonaContactoRef!: ElementRef;
  @ViewChild('cajacif') cajaCIFRef!: ElementRef;
  @ViewChild('cajaprovincia') cajaProvinciaRef!: ElementRef;
  @ViewChild('cajarazonsocial') cajaRazonSocialRef!: ElementRef;
  @ViewChild('cajatipoempresa') cajaTipoEmpresaRef!: ElementRef;

  public provincias!: Array<Provincia>;
  public token!: string;
  

  constructor(
    private _ProvinciasService: ProvinciasService,
    private _EmpresaCentroService: EmpresaCentroService,
    private _PeticionesAltaCentroEmpresa: PeticionesAltaCentroEmpresa,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._ProvinciasService.getProvincias().subscribe((response) => {
      this.provincias = response;
      this.token = localStorage.getItem('token') ?? '';
    });
  }

  registrarEmpresa(): void {
    // Obtener los valores de los campos
    var nombre = this.cajaNombreRef.nativeElement.value;
    var direccion = this.cajaDireccionRef.nativeElement.value;
    var telefono = this.cajaTelefonoRef.nativeElement.value;
    var personaContacto = this.cajaPersonaContactoRef.nativeElement.value;
    var cif = this.cajaCIFRef.nativeElement.value;
    var provincia = this.cajaProvinciaRef.nativeElement.value;
    var razonSocial = this.cajaRazonSocialRef.nativeElement.value;
    var tipoEmpresa = this.cajaTipoEmpresaRef.nativeElement.value;

    var nuevaEmpresa = {
      idEmpresaCentro: 0,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      personaContacto: personaContacto,
      cif: cif,
      idProvincia: parseInt(provincia),
      razonSocial: razonSocial,
      idTipoEmpresa: parseInt(tipoEmpresa),
      estadoEmpresa: 2,
    };

    this._EmpresaCentroService.postEmpresaCentro(nuevaEmpresa, this.token).subscribe((response) => {
      console.log('Respuesta del Servicio:', response); 
      var id = response['idEmpresaCentro'];

      console.log(id)
      
      this._PeticionesAltaCentroEmpresa.postPeticionAltaCentroEmpresa(id, this.token).subscribe((responsePeticion) => {
        this._router.navigate(['/']);
      });
    });
  }
}
