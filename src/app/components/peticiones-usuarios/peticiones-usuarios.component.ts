import { Component, OnInit } from '@angular/core';
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
    console.log(`Petition accepted with ID: ${idPeticion}`);
    this._UsuariosService.updateEstado(idUsuario, 2, this.token).subscribe(() => {
      console.log('Estado del usuario actualizado después de aceptar la petición.');

      this._PeticionesAltaUsersService.deletePeticion(this.token, idPeticion).subscribe(() => {
        console.log('Petición eliminada después de aceptarla.');

        this._PeticionesAltaUsersService.getPeticionesUsers(this.token).subscribe((response) => {
          this.peticionesAltaUsers = response;
          console.log(response);
        });
      });
    });
  }
}