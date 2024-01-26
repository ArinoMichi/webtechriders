import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { EmpresaCentroService } from 'src/app/services/empresa-centro.service';
import { PeticionesAltaUsersService } from 'src/app/services/peticiones-alta-users.service';

import { Provincia } from 'src/app/models/provincia.model';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css'],
})
export class RegistroUsuariosComponent implements OnInit {
  @ViewChild('cajanombre') cajaNombreRef!: ElementRef;
  @ViewChild('cajaapellidos') cajaApellidosRef!: ElementRef;
  @ViewChild('cajaemail') cajaEmailRef!: ElementRef;
  @ViewChild('cajapasswd') cajaPasswdRef!: ElementRef;
  @ViewChild('cajatelefono') cajaTelefonoRef!: ElementRef;
  @ViewChild('cajalinkedin') cajaLinkedinRef!: ElementRef;
  @ViewChild('cajaprovincia') cajaProvinciaRef!: ElementRef;
  @ViewChild('cajaempresa') cajaEmpresaRef!: ElementRef;
  @ViewChild('cajarol') cajaRolRef!: ElementRef;

  public provincias!: Array<Provincia>;
  public empresas!: Array<EmpresaCentro>;
  public filteredEmpresas: Array<EmpresaCentro> = [];

  constructor(
    private _UsuariosService: UsuariosService,
    private _ProvinciasService: ProvinciasService,
    private _EmpresaCentroService: EmpresaCentroService,
    private _PeticionAltaUsersService: PeticionesAltaUsersService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._ProvinciasService.getProvincias().subscribe((response) => {
      this.provincias = response;
    });

    this._EmpresaCentroService.getEmpresasCentros().subscribe((response) => {
      this.empresas = response;
    });
  }

  onRolChange(): void {
    const selectedTipo = parseInt(this.cajaRolRef.nativeElement.value);

    if (selectedTipo == 2) {
      this.filteredEmpresas = this.empresas.filter(
        (empresa) => empresa.idTipoEmpresa === 2
      );
    } else {
      this.filteredEmpresas = this.empresas.filter(
        (empresa) => empresa.idTipoEmpresa === 1
      );
    }
    console.log(this.filteredEmpresas);
  }

  crearUsuario(): void {
    // Obtener los valores de los campos
    var nombre = this.cajaNombreRef.nativeElement.value;
    var apellidos = this.cajaApellidosRef.nativeElement.value;
    var email = this.cajaEmailRef.nativeElement.value;
    var passwd = this.cajaPasswdRef.nativeElement.value;
    var telefono = this.cajaTelefonoRef.nativeElement.value;
    var linkedin = this.cajaLinkedinRef.nativeElement.value;
    var provincia = this.cajaProvinciaRef.nativeElement.value;
    var empresa = parseInt(this.cajaEmpresaRef.nativeElement.value);
    var rol = parseInt(this.cajaRolRef.nativeElement.value);

    var nuevoUsuario = {
      idUsuario: 0,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      telefono: telefono,
      linkedIn: linkedin,
      password: passwd,
      idRole: rol,
      idProvincia: provincia,
      idEmpresaCentro: empresa,
      estado: 2,
    };

    this._UsuariosService.insertUsuario(nuevoUsuario).subscribe((response) => {
      console.log('Respuesta del Servicio:', response);
      var id = response.idUsuario;
      this._PeticionAltaUsersService
        .postPeticionAlta(id)
        .subscribe((response) => {
          this._router.navigate(['/']);
        });
    });
  }
}
