import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TecnologiaCharla } from '../models/tecnologia-charla.model';

@Injectable({
  providedIn: 'root'
})
export class TecnologiasCharlasService {

  constructor(
    private _http: HttpClient
  ) { }

  getTecnologiasCharlas(): Observable<any>{
    var request = "api/tecnologiascharlas"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertTecnologiaCharla(idCharla: number, idTecnologia: number, token: string): Observable<any>{
    var request = "api/tecnologiascharlas"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idcharla', idCharla)
    .append('idtecnologia', idTecnologia)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {} ,{headers: headers, params: params})
  }

  getTecnologiaCharlaByCharla(idcharla: number): Observable<any>{
    var request = "api/tecnologiascharlas/bycharla/" + idcharla
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  getTecnologiaCharlaByTecnologia(idtecnologia: number): Observable<any>{
    var request = "api/tecnologiascharlas/bytecnologia/" + idtecnologia
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteTecnologiaFromCharla(tecnologiaCharla: TecnologiaCharla, token: string): Observable<any>{
    var request = "api/tecnologiascharlas/delete/" 
    + tecnologiaCharla.idCharla + "/" + tecnologiaCharla.idTecnologia
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }

  deleteTecnologiasFromCharla(idCharla: number, token: string){
    var request = "api/tecnologiascharlas/deletebyidcharla/" + idCharla
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
