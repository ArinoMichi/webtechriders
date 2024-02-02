import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public token: any;
  public identity: any;

  @ViewChild('cajaemail') cajaEmailRef!: ElementRef;
  @ViewChild('cajapasswd') cajaPasswdRef!: ElementRef;

  public usuario!: Usuario;

  constructor(
    private _AuthService: AuthService,
    private _UsuariosService: UsuariosService,
    private _router: Router,
  ) { }

  ngOnInit(): void {}

  login(): void {
    // Obtener los valores de los campos
    const email = this.cajaEmailRef.nativeElement.value;
    const passwd = this.cajaPasswdRef.nativeElement.value;

    const usuarioLogin = {
      email: email,
      password: passwd,
    };

    this._AuthService.auth(usuarioLogin).subscribe(
      (response) => {
        console.log("Respuesta del Servicio:", response);
        this.token = response.response;
        localStorage.setItem('token', this.token);
        this._router.navigate(['/']);

        this.handleGetPerfilUsuario();
      },
      (error: HttpErrorResponse) => {
        this.handleAuthError(error);
      }
    );
  }

  private handleGetPerfilUsuario(): void {
    this._UsuariosService.getPerfilUsuario(this.token).subscribe(
      (response) => {
        this.identity = response;

        // Verificar el estado del usuario
        if (this.identity && this.identity.status === 'activo') {
          console.log(this.identity);
          console.log(response);
          localStorage.setItem('identity', JSON.stringify(this.identity));
        } else if (this.identity && this.identity.status === '1') {
          // Alerta si el usuario está pendiente de activación
          Swal.fire({
            icon: 'info',
            title: 'Espera de Activación',
            text: 'Tu cuenta está pendiente de activación. Por favor, espera a que un administrador la active.',
          });
        } else {
          // Alerta si hay un problema de autorización
          Swal.fire({
            icon: 'error',
            title: 'Error de Autenticación',
            text: 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.',
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.handleAuthError(error);
      }
    );
  }

  private handleAuthError(error: HttpErrorResponse): void {
    if (error.status === 401) {
      // Alerta si el usuario o la contraseña son incorrectos
      Swal.fire({
        icon: 'error',
        title: 'Error de Autenticación',
        text: 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.',
      });
    } else if (error.status === 403) {
      // Alerta si el usuario no está activo
      Swal.fire({
        icon: 'info',
        title: 'Espera de Activación',
        text: 'Tu cuenta está pendiente de activación. Por favor, espera a que un administrador la active.',
      });
    } else {
      // Alerta genérica para otros errores
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ha ocurrido un error durante la autenticación. Por favor, intenta nuevamente.',
      });
    }
  }
}
