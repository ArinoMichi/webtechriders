import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private _http: HttpClient
  ) { }

  getRoles(token: string): Observable<any>{
    var request = "api/roles"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.get(url, {headers: headers})
  }

  insertRol(tiporole: string, token: string): Observable<any>{
    var request = "api/roles"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('tiporole', tiporole)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {headers: headers, params: params})
  }

  updateRol(rol: Rol, token: string): Observable<any>{
    var request = "api/roles"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idrole', rol.idRole)
    .append('tiporole', rol.tipoRole)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.put(url, {headers: headers, params: params})
  }

  deleteRol(idrole: number, token: string): Observable<any>{
    var request = "api/roles"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idrole', idrole)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers, params: params})
  }

  getRol(id: number, token: string): Observable<any>{
    var request = "api/roles/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.get(url, {headers: headers})
  }
}
