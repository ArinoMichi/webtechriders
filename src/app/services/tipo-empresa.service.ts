import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoEmpresa } from '../models/tipo-empresa.model';

@Injectable({
  providedIn: 'root'
})
export class TipoEmpresaService {

  constructor(
    private _http: HttpClient
  ) { }

  getTiposEmpresas(): Observable<any>{
    var request = "api/tipoempresa"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertTipoEmpresa(descripcion: string, token: string): Observable<any>{
    var request = "api/tipoempresa"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('descripcion', descripcion)
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {headers: headers, params: params})
  }

  updateTecnologia(tipoEmpresa: TipoEmpresa, token: string): Observable<any>{
    var request = "api/tipoempresa"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idtipoempresa', tipoEmpresa.idTipoEmpresa)
    .append('descripcion', tipoEmpresa.descripcion)
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, {headers: headers, params: params})
  }

  getTecnologia(id: number): Observable<any>{
    var request = "api/tipoempresa/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteTecnologia(id: number, token: string): Observable<any>{
    var request = "api/tipoempresa/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
