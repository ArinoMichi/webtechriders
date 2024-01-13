import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private _http: HttpClient
  ) { }

  getUsuarios(token: string): Observable<any>{
    var request = "api/usuarios"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer" + token)
    return this._http.get(url, {headers: headers})
  }

  insertUsuario(usuario: Usuario, token: string): Observable<any>{
    var json = JSON.stringify(usuario)
    var request = "api/usuarios"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, json, {headers: headers})
  }

  updateUsuario(usuario: Usuario, token: string): Observable<any>{
    var json = JSON.stringify(usuario)
    var request = "api/usuarios"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, json, {headers: headers})
  }

  getUsuario(id: number, token: string): Observable<any>{
    var request = "api/usuarios/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.get(url, {headers: headers})
  }

  deleteUsuario(id: number, token: string): Observable<any>{
    var request = "api/usuarios/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }

  //getPerfilUsuario

  updateEstado(idUsuario: number, estado: number, token: string) {
    var request = "api/usuarios/updateestadousuario/" + idUsuario + "/" + estado
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.put(url, {headers: headers})
  }

  //updatePassword
}
