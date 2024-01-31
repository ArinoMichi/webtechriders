import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { PeticionAltaUsers } from 'src/app/models/peticion-alta-users.model';
import { PeticionesAltaUsersService } from 'src/app/services/peticiones-alta-users.service';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-peticiones-usuarios',
  templateUrl: './peticiones-usuarios.component.html',
  styleUrls: ['./peticiones-usuarios.component.css']
})
export class PeticionesUsuariosComponent implements OnInit {
  public peticionesAltaUsers!: Array<PeticionAltaUsers>;
  public usuarios: Usuario[] = [];
  public usuario!: Usuario;
  token: string = '';

  constructor(
    private _PeticionesAltaUsersService: PeticionesAltaUsersService,
    private _UsuariosService: UsuariosService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';

    // Obtener peticiones de usuarios
    this._PeticionesAltaUsersService.getPeticionesUsers(this.token).subscribe((response) => {
      this.peticionesAltaUsers = response;

      // Obtener información de cada usuario asociado a una petición
      this.peticionesAltaUsers.forEach((peticion) => {
        this._UsuariosService.getUsuario(peticion.idUser, this.token).subscribe((usuario: Usuario) => {
          this.usuarios.push(usuario);
        });
      });
    });
  }

  getNombreUsuario(idUsuario: number): string {
    const usuario = this.usuarios.find(u => u.idUsuario === idUsuario);
    return usuario ? `${usuario.nombre} ${usuario.apellidos}` : '';
  }

  getUsuarioInfo(idUsuario: number): Usuario | undefined {
    return this.usuarios.find(u => u.idUsuario === idUsuario);
  }

  getTipoUsuario(usuario: Usuario | undefined): string {
    if (usuario) {
      switch (usuario.idRole) {
        case 1:
          return 'ADMIN';
        case 2:
          return 'PROFESOR';
        case 3:
          return 'TECHRIDER';
        case 4:
          return 'REPRESENTANTE';
        default:
          return 'Desconocido';
      }
    } else {
      return 'Desconocido';
    }
  }

  aceptarPeticion(idPeticion: number, idUsuario: number): void {
    const usuario = this.getUsuarioInfo(idUsuario);
    const mensaje = `¿Quieres dar de alta a ${usuario?.nombre} ${usuario?.apellidos}?`;

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._UsuariosService.updateEstado(idUsuario, 1, this.token).subscribe(() => {
          console.log('Estado del usuario actualizado después de aceptar la petición.');

          this._PeticionesAltaUsersService.deletePeticion(this.token, idPeticion).subscribe(() => {
            console.log('Petición eliminada después de aceptarla.');

            this._PeticionesAltaUsersService.getPeticionesUsers(this.token).subscribe((response) => {
              this.peticionesAltaUsers = response;
              console.log(response);
            });

            Swal.fire('¡Petición aceptada!', '', 'success');
          });
        });
      }
    });
  }

  denegarPeticion(idPeticion: number, idUsuario: number): void {
    const usuario = this.getUsuarioInfo(idUsuario);
    const mensaje = `¿Quieres denegar la petición de ${usuario?.nombre} ${usuario?.apellidos}?`;

    Swal.fire({
      title: '¿Estás seguro?',
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, denegar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._UsuariosService.updateEstado(idUsuario, 0, this.token).subscribe(() => {
          console.log('Estado del usuario actualizado después de denegar la petición.');

          this._PeticionesAltaUsersService.deletePeticion(this.token, idPeticion).subscribe(() => {
            console.log('Petición eliminada después de denegarla.');

            this._PeticionesAltaUsersService.getPeticionesUsers(this.token).subscribe((response) => {
              this.peticionesAltaUsers = response;
              console.log(response);
            });

            Swal.fire('¡Petición denegada!', '', 'success');
          });
        });
      }
    });
  }

  mostrarDetallesUsuario(idUsuario: number): void {
    this._UsuariosService.getUsuario(idUsuario, this.token).subscribe(
      (usuario: Usuario) => {
        const detallesUsuario = `
          <strong>Nombre:</strong> ${usuario.nombre} ${usuario.apellidos}<br>
          <strong>Email:</strong> ${usuario.email}<br>
          <strong>Teléfono:</strong> ${usuario.telefono}<br>
          <strong>LinkedIn:</strong> ${usuario.linkedIn}<br>
          <strong>Tipo Usuario:</strong> ${this.getTipoUsuario(usuario)}<br>
          <strong>Estado:</strong> ${usuario.estado === 1 ? 'Activo' : 'Inactivo'}
          <!-- Agrega más detalles según sea necesario -->
        `;

        Swal.fire({
          title: 'Detalles del Usuario',
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

}