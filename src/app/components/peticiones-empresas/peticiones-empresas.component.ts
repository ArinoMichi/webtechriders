import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PeticionesAltaCentroEmpresa } from 'src/app/services/peticiones-alta-centroempresa.service';
import { PeticionCentroEmpresa } from 'src/app/models/peticion-centro-empresa.model';

import { EmpresaCentroService } from 'src/app/services/empresa-centro.service';
import { EmpresaCentro } from 'src/app/models/empresa-centro.model';

@Component({
  selector: 'app-peticiones-empresas',
  templateUrl: './peticiones-empresas.component.html',
  styleUrls: ['./peticiones-empresas.component.css']
})
export class PeticionesEmpresasComponent {
  public peticionesCentroEmpresa!: Array<PeticionCentroEmpresa>;
  public empresasCentros: EmpresaCentro[] = [];
  public empresaCentro!: EmpresaCentro;
  token: string = '';

  constructor(
    private _PeticionesAltaCentroEmpresa: PeticionesAltaCentroEmpresa,
    private _EmpresaCentroService: EmpresaCentroService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';

    // Obtener peticiones de usuarios
    this._PeticionesAltaCentroEmpresa.getPeticionesCentroEmpresa(this.token).subscribe((response) => {
      this.peticionesCentroEmpresa = response;

      // Obtener información de cada usuario asociado a una petición
      this.peticionesCentroEmpresa.forEach((peticion) => {
        this._EmpresaCentroService.getEmpresaCentro(peticion.idCentroEmpresa).subscribe((empresaCentro: EmpresaCentro) => {
          this.empresasCentros.push(empresaCentro);
        });
      });
    });
  }

  getNombreEmpresaCentro(idCentroEmpresa: number): string {
    const empresaCentro = this.empresasCentros.find(u => u.idEmpresaCentro === idCentroEmpresa);
    return empresaCentro ? `${empresaCentro.nombre}` : '';
  }

  getEmpresaCentroInfo(idEmpresaCentro: number): EmpresaCentro | undefined {
    return this.empresasCentros.find(u => u.idEmpresaCentro === idEmpresaCentro);
  }

  getTipoEmpresaCentro(empresaCentro: EmpresaCentro | undefined): string {
    if (empresaCentro) {
      switch (empresaCentro.idTipoEmpresa) {
        case 1:
          return 'EMPRESA';
        case 2:
          return 'CENTRO/ESCUELA';
        default:
          return 'Desconocido';
      }
    } else {
      return 'Desconocido';
    }
  }

  mostrarDetallesEmpresaCentro(idEmpresaCentro: number): void {
    this._EmpresaCentroService.getEmpresaCentro(idEmpresaCentro).subscribe(
      (empresaCentro: EmpresaCentro) => {
        const detallesUsuario = `
          <strong>Nombre:</strong> ${empresaCentro.nombre}<br>
          <strong>Estado:</strong> ${empresaCentro.estadoEmpresa === 1 ? 'Activo' : 'Inactivo'}
          <!-- Agrega más detalles según sea necesario -->
        `;

        Swal.fire({
          title: 'Detalles de '+`${empresaCentro.nombre}`,
          html: detallesUsuario,
          confirmButtonText: 'Cerrar'
        });
      },
      (error) => {
        console.error('Error al obtener detalles del usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener la información del usuario.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    );
  }

  aceptarPeticion(idPeticion: number, idCentroEmpresa: number): void {
    const empresaCentro = this.getEmpresaCentroInfo(idCentroEmpresa);
    const mensaje = `¿Quieres dar de alta a ${empresaCentro?.nombre}?`;

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._EmpresaCentroService.updateEstado(idCentroEmpresa, 1, this.token).subscribe(() => {
          console.log('Estado de la empresa actualizado después de aceptar la petición.');

          this._PeticionesAltaCentroEmpresa.deletePeticionCentroEmpresa(this.token, idPeticion).subscribe(() => {
            console.log('Petición eliminada después de aceptarla.');

            this._PeticionesAltaCentroEmpresa.getPeticionesCentroEmpresa(this.token).subscribe((response) => {
              this.peticionesCentroEmpresa = response;
              console.log(response);
            });

            Swal.fire('¡Petición aceptada!', '', 'success');
          });
        });
      }
    });
  }
  denegarPeticion(idPeticion: number, idCentroEmpresa: number): void {
    const empresaCentro = this.getEmpresaCentroInfo(idCentroEmpresa);
    const mensaje = `¿Quieres denegar la petición de ${empresaCentro?.nombre}?`;

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, denegar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._PeticionesAltaCentroEmpresa.deletePeticionCentroEmpresaAll(this.token, idPeticion).subscribe(() => {
          console.log('Petición eliminada después de denegarla.');

          this._PeticionesAltaCentroEmpresa.getPeticionesCentroEmpresa(this.token).subscribe((response) => {
            this.peticionesCentroEmpresa = response;
            console.log(response);
          });

          Swal.fire('¡Petición denegada!', '', 'success');
        });
      }
    });
  }

}
