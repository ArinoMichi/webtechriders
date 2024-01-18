import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpresaCentro } from '../models/empresa-centro.model';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class EmpresasCentrosService {

  constructor(
    private _http: HttpClient
  ) { }

  getEmpresasCentros(): Observable<any>{
    var request = "api/empresascentros"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  getEmpresas(): Observable<any> {
    var request = "api/empresascentros"
    const url = environment.urlApi + request;
    console.log(url)

    return this._http.get(url).pipe(
      filter((empresa: any) => empresa.idTipoEmpresa === 1)
    );
  }

  insertEmpresaCentro(empresaCentro: EmpresaCentro, token: string): Observable<any>{
    var json = JSON.stringify(empresaCentro)
    var request = "api/empresascentros"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, json, {headers: headers})
  }

  updateEmpresaCentro(empresaCentro: EmpresaCentro, token: string): Observable<any>{
    var json = JSON.stringify(empresaCentro)
    var request = "api/empresascentros"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, json, {headers: headers})
  }

  getEmpresaCentro(id: number): Observable<any>{
    var request = "api/empresascentros/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteEmpresaCentro(id: number, token: string): Observable<any>{
    var request = "api/empresascentros/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set ('Authorization' , "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
