import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  auth(usuario: Usuario): Observable<any>{
    var request = "api/auth/login"
    var url = environment.urlApi + request
    var json = JSON.stringify(usuario)
    var headers = new HttpHeaders().set('Content-type', 'application/json')
    return this._http.post(url, json, {headers: headers})
  }

}
