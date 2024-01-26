import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoCharla } from '../models/estado-charla.model';

@Injectable({
  providedIn: 'root'
})
export class EstadosCharlasService {

  constructor(
    private _http: HttpClient
  ) { }

  getEstadosCharlas(): Observable<any>{
    var request = "api/estadoscharlas"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertEstadoCharla(estadoCharla: EstadoCharla, token: string): Observable<any>{
    var json = JSON.stringify(estadoCharla)
    var request = "api/estadoscharlas"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, json, {headers: headers})
  }

  updateValoracionCharla(estadoCharla: EstadoCharla, token: string): Observable<any>{
    var json = JSON.stringify(estadoCharla)
    var request = "api/estadoscharlas"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, json, {headers: headers})
  }

  getValoracionCharla(id: number): Observable<any>{
    var request = "api/estadoscharlas/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteValoracionCharla(id: number, token: string): Observable<any>{
    var request = "api/estadoscharlas/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
