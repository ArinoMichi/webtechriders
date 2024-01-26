import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TecnologiaTechRiders } from '../models/tecnologia-tech-riders.model';

@Injectable({
  providedIn: 'root'
})
export class TecnologiasTechRidersService {

  constructor(
    private _http: HttpClient
  ) { }

  getTecnologiasTechRiders(): Observable<any>{
    var request = "api/tecnologiastechriders"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertTecnologiaTechRiders(tecnologia: TecnologiaTechRiders, token: string): Observable<any>{
    var request = "api/tecnologiastechriders"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idtechrider', tecnologia.idUsuario)
    .append('idtecnologia', tecnologia.idTecnologia)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {headers: headers, params: params})
  }

  updateTecnologiaTechRiders(tecnologia: TecnologiaTechRiders, token: string): Observable<any> {
    var request = "api/tecnologiastechriders"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idtechrider', tecnologia.idUsuario)
    .append('idtecnologia', tecnologia.idTecnologia)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.put(url, {headers: headers, params: params})
  }

  // Obtiene los TECNOLOGIATECHRIDERS de un TECHRIDER
  getTecnologiasTechRidersAll(idtechrider: number): Observable<any>{
    var request = "api/tecnologiastechriders/all/" + idtechrider
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteTecnologiaTechRiders(tecnologia: TecnologiaTechRiders, token: string): Observable<any>{
    var request = "api/tecnologiastechriders/delete/" 
    + tecnologia.idUsuario + "/" + tecnologia.idTecnologia
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
