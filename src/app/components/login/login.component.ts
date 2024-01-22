import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

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

  public token: any
  public identity: any

  @ViewChild('cajaemail') cajaEmailRef!: ElementRef;
  @ViewChild('cajapasswd') cajaPasswdRef!: ElementRef;

  public usuario!: Usuario;

  constructor(
    private _AuthService: AuthService,
    private _UsuariosService: UsuariosService,
    private _router: Router,
  ) { }

  ngOnInit(): void {

  }

  login(): void {
    // Obtener los valores de los campos
    var email = this.cajaEmailRef.nativeElement.value;
    var passwd = this.cajaPasswdRef.nativeElement.value;
  
    var usuarioLogin = {
      email: email,
      password: passwd,
    };

    
    this._AuthService.auth(usuarioLogin).subscribe((response) => {
      console.log("Respuesta del Servicio:", response);
      this.token = response.response;
      localStorage.setItem('token', this.token);
      this._router.navigate(['/']);
      this._UsuariosService.getPerfilUsuario(this.token).subscribe((response)=>{
        this.identity = response
        console.log(this.identity)
        console.log(response)
        localStorage.setItem('identity', JSON.stringify(this.identity))
      })
    });
    
  }
}

