import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeticionCentroEmpresa } from '../models/peticion-centro-empresa.model';

@Injectable({
  providedIn: 'root',
})
export class PeticionesAltaCentroEmpresa {
  constructor(private _http: HttpClient) { }

  postPeticionAltaCentroEmpresa(id: number, token: string): Observable<any> {
    var request = 'api/PeticionesCentroEmpresa';
    var url = environment.urlApi + request;

    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    var params = new HttpParams().append('idcentroempresa', id.toString());

    return this._http.post(url, null, { params: params });
  }

  getPeticionesCentroEmpresa(token: string): Observable<any> {
    var request = 'api/PeticionesCentroEmpresa';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  deletePeticionCentroEmpresa(token: string, id: number): Observable<any> {
    var request = 'api/PeticionesCentroEmpresa';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    var params = new HttpParams().set('idpeticion', id.toString());

    return this._http.delete(url, { headers: headers, params: params });
  }


  deletePeticionCentroEmpresaAll(token: string, id: number): Observable<any> {
    var request = `api/PeticionesCentroEmpresa/DeletePeticionEmpresaAll/${id}`;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);

    return this._http.delete(url, { headers: headers });
  }
}
