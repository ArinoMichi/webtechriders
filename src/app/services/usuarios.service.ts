import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private _http: HttpClient) {}

  getUsuarios(token: string): Observable<any> {
    var request = 'api/usuarios';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  insertUsuario(usuario: Usuario): Observable<any> {
    var json = JSON.stringify(usuario);
    var request = 'api/usuarios';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(url, json, { headers: headers });
  }

  updateUsuario(usuario: Usuario, token: string): Observable<any> {
    var json = JSON.stringify(usuario);
    var request = 'api/usuarios';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'bearer ' + token);
    return this._http.put(url, json, { headers: headers });
  }

  getUsuario(id: number, token: string): Observable<any> {
    var request = 'api/usuarios/' + id;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  deleteUsuario(id: number, token: string): Observable<any> {
    var request = 'api/usuarios/' + id;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.delete(url, { headers: headers });
  }

  getPerfilUsuario(token: string): Observable<any> {
    var request = 'api/usuarios/perfilusuario';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  updateEstado(idUsuario: number, estado: number, token: string) {
    var request =
      'api/usuarios/updateestadousuario/' + idUsuario + '/' + estado;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.put(url, { headers: headers });
  }

  findEmpresaTechRider(id: number): Observable<any> {
    var request = 'api/QueryTools/FindEmpresaTechRider/' + id;
    var url = environment.urlApi + request;

    return this._http.get(url);
  }

  //updatePassword

  getTechRiders(): Observable<any>{
    var request = "api/QueryTools/TodosTechRidersActivos"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  getFindTechRidersEnEmpresa​(id: number): Observable<any>{
    var request = "api/QueryTools/FindTechRidersEnEmpresa/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }
}
