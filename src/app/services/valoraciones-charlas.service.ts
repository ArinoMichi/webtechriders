import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ValoracionCharla } from '../models/valoracion-charla.model';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesCharlasService {

  constructor(
    private _http: HttpClient
  ) { }

  getValoracionesCharlas(): Observable<any>{
    var request = "api/valoracionescharlas"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertValoracionCharla(valoracionCharla: ValoracionCharla, token: string): Observable<any>{
    var json = JSON.stringify(valoracionCharla)
    var request = "api/valoracionescharlas"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, json, {headers: headers})
  }

  updateValoracionCharla(valoracionCharla: ValoracionCharla, token: string): Observable<any>{
    var json = JSON.stringify(valoracionCharla)
    var request = "api/valoracionescharlas"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, json, {headers: headers})
  }

  getValoracionCharla(id: number): Observable<any>{
    var request = "api/valoracionescharlas/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteValoracionCharla(id: number, token: string): Observable<any>{
    var request = "api/valoracionescharlas/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }

  getValoracionCharlaByCharla(idCharla: number): Observable<any>{
    var request = "api/valoracionescharlas/valoraciones/" + idCharla
    var url = environment.urlApi + request
    return this._http.get(url)
  }
}
