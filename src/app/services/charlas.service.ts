import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Charla } from '../models/charla.model';

@Injectable({
  providedIn: 'root',
})
export class CharlasService {
  constructor(private _http: HttpClient) {}

  getCharlas(): Observable<any> {
    var request = 'api/charlas';
    var url = environment.urlApi + request;
    return this._http.get(url);
  }

  insertCharla(charla: Charla, token: string): Observable<any> {
    var json = JSON.stringify(charla);
    var request = 'api/charlas';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'bearer ' + token);
    return this._http.post(url, json, { headers: headers });
  }

  updateCharla(charla: Charla, token: string): Observable<any> {
    var json = JSON.stringify(charla);
    var request = 'api/charlas';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'bearer ' + token);
    return this._http.put(url, json, { headers: headers });
  }

  getCharla(id: number): Observable<any> {
    var request = 'api/charlas/' + id;
    var url = environment.urlApi + request;
    return this._http.get(url);
  }

  deleteCharla(id: number, token: string): Observable<any> {
    var request = 'api/Charlas/' + id;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.delete(url, { headers: headers });
  }

  associateTechRider(idTechRider: number, idCharla: number, token: string): Observable<any> {
    const request = `api/charlas/asociartechridercharla/${idTechRider}/${idCharla}`;
    const url = `${environment.urlApi}/${request}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.put(url, {}, { headers });
  }
  

  updateObservaciones(
    idCharla: number,
    observaciones: string,
    token: string
  ): Observable<any> {
    var request =
      'api/charlas/updateobservacionescharla/' + idCharla + '/' + observaciones;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.put(url, { headers: headers });
  }

  updateEstado(
    idCharla: number,
    idEstadoCharla: number,
    token: string
  ): Observable<any> {
    var request =
      'api/charlas/updateestadocharla/' + idCharla + '/' + idEstadoCharla;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.put(url, { headers: headers });
  }

  updateFecha(
    idCharla: number,
    fechaCharla: Date,
    token: string
  ): Observable<any> {
    var request =
      'api/charlas/updatefechacharla/' + idCharla + '/' + fechaCharla;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.put(url, { headers: headers });
  }

  getCharlasDetalles(): Observable<any> {
    var request = 'api/querytools/charlasviewall';
    var url = environment.urlApi + request;
    return this._http.get(url);
  }

  getCharlaDetalles(idCharla: number): Observable<any> {
    var request = 'api/querytools/findcharlaview';
    var url = environment.urlApi + request;
    var params = new HttpParams().append('idcharla', idCharla);
    return this._http.get(url, { params: params });
  }

  getCharlasTechRider(idTechRider: number): Observable<any> {
    var request = 'api/querytools/charlastechrider/' + idTechRider;
    var url = environment.urlApi + request;
    return this._http.get(url);
  }

  getCharlasEstado(idEstadoCharla: number): Observable<any>{
    var request = "/api/Charlas/FindCharlasState/" + idEstadoCharla
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  getCharlasEmpresa(idEmpresa: number): Observable<any>{
    var request = "/api/QueryTools/FindCharlasTechriderEmpresa/" + idEmpresa
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  getCharlasPendientesTecnologiasTechrider(token: string): Observable<any> {
    var request = 'api/querytools/FindCharlasPendientesTecnologiasTechrider';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  getCharlasProfesor(id: number): Observable<any> {
    var request = "api/querytools/charlascursosprofesor/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

}
