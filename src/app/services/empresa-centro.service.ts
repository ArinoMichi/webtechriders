import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpresaCentro } from '../models/empresa-centro.model';

@Injectable({
  providedIn: 'root',
})
export class EmpresaCentroService {
  constructor(private _http: HttpClient) {}

  getEmpresasCentros(): Observable<any> {
    var request = 'api/empresascentros';
    var url = environment.urlApi + request;

    return this._http.get(url);
  }

  getEmpresaCentro(id: number): Observable<any> {
    var request = 'api/empresascentros/' + id;
    var url = environment.urlApi + request;
    return this._http.get(url);
  }

  postEmpresaCentro(empresa: EmpresaCentro, token: string): Observable<any> {
    var json = JSON.stringify(empresa);
    var request = 'api/empresascentros';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .set('Authorization', 'bearer ' + token);
    return this._http.post(url, json, { headers: headers });
  }

  updateEstado(
    idCentroEmpresa: number,
    estado: number,
    token: string
  ): Observable<any> {
    var request =
      'api/EmpresasCentros/UpdateEstadoEmpresaCentro/' +
      idCentroEmpresa +
      '/' +
      estado;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);

    var options = { headers: headers };

    return this._http.put(url, null, options);
  }

  deleteEmpresaCentro(id: number, token: string): Observable<any> {
    var request = 'api/EmpresasCentros/' + id;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.delete(url, { headers: headers });
  }
}
