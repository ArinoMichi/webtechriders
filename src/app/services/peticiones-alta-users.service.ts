import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeticionAltaUsers } from '../models/peticion-alta-users.model';

@Injectable({
  providedIn: 'root',
})
export class PeticionesAltaUsersService {
  constructor(private _http: HttpClient) {}

  postPeticionAlta(id: number): Observable<any> {
    const request = 'api/PeticionesAltaUsers';
    const url = environment.urlApi + request;
    
    const params = new HttpParams().set('iduser', id.toString());
    return this._http.post(url, null, { params: params });
  }
}
