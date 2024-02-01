import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PeticionesTecnologiasService } from 'src/app/services/peticiones-tecnologias.service';
import { PeticionTecnologia } from 'src/app/models/peticion-tecnologia.model';

import { TecnologiasService } from 'src/app/services/tecnologias.service';
import { Tecnologia } from 'src/app/models/tecnologia.model';

@Component({
  selector: 'app-peticiones-tecnologias',
  templateUrl: './peticiones-tecnologias.component.html',
  styleUrls: ['./peticiones-tecnologias.component.css'],
})
export class PeticionesTecnologiasComponent implements OnInit {
  public peticionesTecnologias!: Array<PeticionTecnologia>;
  public tecnologias!: Array<Tecnologia>;
  public tecnologia!: Tecnologia;
  token: string = '';

  constructor(
    private _PeticionesTecnologiasService: PeticionesTecnologiasService,
    private _TecnologiasService: TecnologiasService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';

    this._PeticionesTecnologiasService
      .getPeticionesTecnologias(this.token)
      .subscribe((response) => {
        this.peticionesTecnologias = response;
      });
    this._TecnologiasService.getTecnologias().subscribe((response) => {
      this.tecnologias = response;
    });
  }

  borrarTecnologia(idTecnologia: number, nombreTecnologia: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'estas seguro que quieres borrar ' + nombreTecnologia,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._TecnologiasService
          .deleteTecnologia(idTecnologia, this.token)
          .subscribe(() => {
            console.log('Tecnologia eliminada.');
            this._TecnologiasService.getTecnologias().subscribe((response) => {
              this.tecnologias = response;
              console.log(response);
            });
            Swal.fire('¡Tecnologia borrada!', '', 'success');
          });
      }
    });
  }

  getNombreTipoTecnologia(idTipoTecnologia: number): string {
    switch (idTipoTecnologia) {
      case 1:
        return 'Técnica';
      case 2:
        return 'Motivacional';
      case 3:
        return 'SoftSkills';
      default:
        return '';
    }
  }

  aceptarPeticion(idPeticion: number, nombreTecnologia: string): void {
    var idTipoTecnologia = 0;
    const mensaje = '¿Quieres añadir la tecnología: ' + nombreTecnologia + ' ?';
    const tiposTecnologia = ['Técnica', 'Motivacional', 'SoftSkills'];
    const tipoTecnologiaMapping: { [key: string]: number } = {
      Técnica: 1,
      Motivacional: 2,
      SoftSkills: 3,
    };

    Swal.fire({
      title: `${mensaje}`,
      html: `
      <label for="tipoTecnologia">Selecciona el tipo de tecnología:</label>
      <select id="tipoTecnologia" class="swal2-select">
        ${tiposTecnologia
          .map(
            (tipo) =>
              `<option value="${tipoTecnologiaMapping[tipo]}">${tipo}</option>`
          )
          .join('')}
      </select>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const selectedTipoTecnologia = parseInt(
          (<HTMLSelectElement>document.getElementById('tipoTecnologia')).value,
          10
        );
        return selectedTipoTecnologia;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const selectedTipoTecnologia = result.value;
        var nuevaTecnologia = {
          idTecnologia: 0,
          nombreTecnologia: nombreTecnologia,
          idTipoTecnologia: selectedTipoTecnologia,
        };

        console.log(nuevaTecnologia);

        this._TecnologiasService
          .insertTecnologia(nuevaTecnologia, this.token)
          .subscribe(() => {
            console.log('Nueva Tecnologia añadida.');
            this._PeticionesTecnologiasService
              .deletePeticionTecnologia(this.token, idPeticion)
              .subscribe(() => {
                console.log('Petición eliminada después de aceptarla.');

                this._TecnologiasService.getTecnologias().subscribe((response) => {
                  this.tecnologias = response;
                });

                this._PeticionesTecnologiasService
                  .getPeticionesTecnologias(this.token)
                  .subscribe((response) => {
                    this.peticionesTecnologias = response;
                    console.log(response);
                  });

                this._TecnologiasService.getTecnologias().subscribe((response) => {
                  this.tecnologias = response;
                });

                Swal.fire('¡Petición aceptada!', '', 'success');
              });
          });
      }
    });
  }

  denegarPeticion(idPeticion: number, nombreTecnologia: string): void {
    const mensaje = '¿Quieres denegar la petición ' + nombreTecnologia + ' ?';

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, denegar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._PeticionesTecnologiasService
          .deletePeticionTecnologia(this.token, idPeticion)
          .subscribe(() => {
            console.log('Petición eliminada después de denegarla.');

            this._TecnologiasService.getTecnologias().subscribe((response) => {
              this.tecnologias = response;
            });

            this._PeticionesTecnologiasService
              .getPeticionesTecnologias(this.token)
              .subscribe((response) => {
                this.peticionesTecnologias = response;
                console.log(response);
              });

            Swal.fire('¡Petición denegada!', '', 'success');
          });
      }
    });
  }

  modificarTecnologia(idTecnologia: number, nombreTecnologia: string, idTipoTecnologia:number): void {
    const mensaje = '¿Quieres modificar la tecnología: ' + nombreTecnologia + ' ?';
  
    Swal.fire({
      title: `${mensaje}`,
      html: `
      <label for="nuevoNombreTecnologia">Nuevo nombre de la tecnología:</label>
      <input id="nuevoNombreTecnologia" class="swal2-input" value="${nombreTecnologia}">
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nuevoNombreTecnologia = (<HTMLInputElement>document.getElementById('nuevoNombreTecnologia')).value;
        return nuevoNombreTecnologia;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevoNombreTecnologia = result.value;
        const tecnologiaModificada = {
          idTecnologia: idTecnologia,
          nombreTecnologia: nuevoNombreTecnologia,
          idTipoTecnologia: idTipoTecnologia,
        };

        console.log(tecnologiaModificada)
  
        this._TecnologiasService.putTecnologia(tecnologiaModificada, this.token)
          .subscribe(() => {
            console.log('Tecnología modificada.');
            this._TecnologiasService.getTecnologias().subscribe((response) => {
              this.tecnologias = response;
            });
            Swal.fire('¡Tecnología modificada!', '', 'success');
          });
      }
    });
  }
}
