import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TecnologiasService {
  constructor(private _http: HttpClient) {}

  getTecnologias(): Observable<any> {
    var request = 'api/Tecnologias';
    var url = environment.urlApi + request;

    return this._http.get(url);
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