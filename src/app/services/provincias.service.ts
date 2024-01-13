import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Provincia } from '../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(
    private _http: HttpClient
  ) { }

  getProvincias(): Observable<any> {
    var request = "api/provincias"
    var url = environment.urlApi + request
    return this._http.get(url);
  }

  insertProvincia(nombreProvincia: string, token: string): Observable<any>{
    var request = "api/provincias"
    var url = environment.urlApi + request
    var params = new HttpParams().append('nombreprovincia', nombreProvincia)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {headers: headers, params: params})
  }

  updateProvincia(provincia: Provincia, token: string): Observable<any>{
    var request = "api/provincias"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idprovincia', provincia.idProvincia)
    .append('nombreprovincia', provincia.nombreProvincia)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.put(url, {headers: headers, params: params})
  }

  deleteProvincia(idProvincia: number, token: string): Observable<any>{
    var request = "api/provincias"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idprovincia', idProvincia)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers, params: params})
  }

  getProvincia(id: number): Observable<any>{
    var request = "api/provincias/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }
}
