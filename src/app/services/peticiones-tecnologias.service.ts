import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnologia } from '../models/tecnologia.model';

@Injectable({
  providedIn: 'root',
})
export class PeticionesTecnologiasService {
  constructor(private _http: HttpClient) {}

  postPeticionTecnologias(nombreTecnologia: string, token: string): Observable<any> {
    var request = 'api/PeticionesTecnologias';
    var url = environment.urlApi + request;

    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    var params = new HttpParams().append('tecnologia', nombreTecnologia);

    return this._http.post(url, null, { headers: headers, params: params });
  }

  getPeticionesTecnologias(token: string): Observable<any> {
    var request = 'api/PeticionesTecnologias';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  deletePeticionTecnologia(token: string, id: number): Observable<any> {
    var request = 'api/PeticionesTecnologias/'+id;
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);

    return this._http.delete(url, { headers: headers });
  }
  
}
