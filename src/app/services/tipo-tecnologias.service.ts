import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoTecnologia } from '../models/tipo-tecnologia.model';

@Injectable({
  providedIn: 'root'
})
export class TipoTecnologiasService {

  constructor(
    private _http: HttpClient
  ) { }

  getTipoTecnologias(): Observable<any>{
    var request = "api/tipotecnologias"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertTipoTecnologia(descripcion: string, token: string): Observable<any>{
    var request = "api/tipotecnologias"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('descripcion', descripcion)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {headers: headers, params: params})
  }

  updateTipoTecnologia(tipoTecnologia: TipoTecnologia, token: string): Observable<any>{
    var request = "api/tipotecnologias"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idtipotecnologia', tipoTecnologia.idTipoTecnologia)
    .append('descripcion', tipoTecnologia.descripcion)
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, params, {headers: headers})
  }

  getTipoTecnologia(id: number, token: string): Observable<any>{
    var request = "api/tipotecnologias/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.get(url, {headers: headers})
  }

  deleteTipoTecnologia(idTipoTecnologia: number, token: string): Observable<any>{
    var request = "api/tipotecnologias/" + idTipoTecnologia
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
