import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PeticionAltaUsers } from '../models/peticion-alta-users.model';

@Injectable({
  providedIn: 'root',
})
export class PeticionesAltaUsersService {
  constructor(private _http: HttpClient) {}

  postPeticionAlta(id: number): Observable<any> {
    var request = 'api/PeticionesAltaUsers?iduser='+id;
    var url = environment.urlApi + request;

    return this._http.get(url);
  }
}
