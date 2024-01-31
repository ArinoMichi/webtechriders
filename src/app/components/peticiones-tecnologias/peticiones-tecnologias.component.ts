import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PeticionesTecnologiasService } from 'src/app/services/peticiones-tecnologias.service';
import { PeticionTecnologia } from 'src/app/models/peticion-tecnologia.model';

import { TecnologiasService } from 'src/app/services/tecnologias.service';
import { Tecnologia } from 'src/app/models/tecnologia.model';

@Component({
  selector: 'app-peticiones-tecnologias',
  templateUrl: './peticiones-tecnologias.component.html',
  styleUrls: ['./peticiones-tecnologias.component.css']
})
export class PeticionesTecnologiasComponent implements OnInit {
  public peticionesTecnologias!: Array<PeticionTecnologia>;
  public tecnologia!: Tecnologia;
  token: string = ''

  constructor(
    private _PeticionesTecnologiasService: PeticionesTecnologiasService,
    private _TecnologiasService: TecnologiasService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    
    this._PeticionesTecnologiasService.getPeticionesTecnologias(this.token).subscribe((response) => {
      this.peticionesTecnologias = response;
    });
  }

  aceptarPeticion(idPeticion: number, nombreTecnologia: string, idTipoTecnologia: number): void {
    const mensaje = "¿Quieres añadir la tecnologia: "+nombreTecnologia+" ?";

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var nuevaTecnologia = {
          idTecnologia: 0,
          nombreTecnologia: nombreTecnologia,
          idTipoTecnologia: idTipoTecnologia,
        };

        console.log(nuevaTecnologia)

        this._TecnologiasService.insertTecnologia(nuevaTecnologia, this.token).subscribe(() => {
          console.log('Nueva Tecnologia añadida.');
          
          this._PeticionesTecnologiasService.deletePeticionTecnologia(this.token, idPeticion).subscribe(() => {
            console.log('Petición eliminada después de aceptarla.');

            this._PeticionesTecnologiasService.getPeticionesTecnologias(this.token).subscribe((response) => {
              this.peticionesTecnologias = response;
              console.log(response);
            });

            Swal.fire('¡Petición aceptada!', '', 'success');
          });
        });
      }
    });
  }

  denegarPeticion(idPeticion: number, nombreTecnologia: string): void {
    const mensaje = "¿Quieres denegar la petición "+nombreTecnologia+" ?";

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, denegar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._PeticionesTecnologiasService.deletePeticionTecnologia(this.token, idPeticion).subscribe(() => {
          console.log('Petición eliminada después de denegarla.');

          this._PeticionesTecnologiasService.getPeticionesTecnologias(this.token).subscribe((response) => {
            this.peticionesTecnologias = response;
            console.log(response);
          });

          Swal.fire('¡Petición denegada!', '', 'success');
        });
      }
    });
  }
}
