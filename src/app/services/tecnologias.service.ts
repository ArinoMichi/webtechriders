import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnologia } from '../models/tecnologia.model';

@Injectable({
  providedIn: 'root'
})
export class TecnologiasService {

  constructor(
    private _http: HttpClient
  ) { }

  getTecnologias(): Observable<any>{
    var request = "api/tecnologias"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertTecnologia(tecnologia: Tecnologia, token: string): Observable<any>{
    var json = JSON.stringify(tecnologia)
    var request = "api/tecnologias"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, json, {headers: headers})
  }

  updateTecnologia(tecnologia: Tecnologia, token: string): Observable<any>{
    var json = JSON.stringify(tecnologia)
    var request = "api/tecnologias"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, json, {headers: headers})
  }

  getTecnologia(id: number): Observable<any>{
    var request = "api/tecnologias/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteTecnologia(id: number, token: string): Observable<any>{
    var request = "api/tecnologias/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }

  postTecnologiaTechrider(idTechRider: number, idTecnologia: number, token: string): Observable<any> {
    const request = 'api/TecnologiasTechRiders';
    const url = `${environment.urlApi}${request}?idtechrider=${idTechRider}&idtecnologia=${idTecnologia}`;
  
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + token);
  
    return this._http.post(url, null, { headers: headers });
  }
}
