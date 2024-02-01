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
    var request = 'api/PeticionesAltaUsers';
    var url = environment.urlApi + request;
    
    var params = new HttpParams().append('iduser', id.toString());
  
    return this._http.post(url, null, { params: params });
  }
  

  getPeticionesUsers(token: string): Observable<any> {
    var request = 'api/PeticionesAltaUsers';
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this._http.get(url, { headers: headers });
  }

  deletePeticion(token: string, id: number): Observable<any> {
    var request = 'api/PeticionesAltaUsers'; 
    var url = environment.urlApi + request;
    var headers = new HttpHeaders().set('Authorization', 'bearer ' + token);
    var params = new HttpParams().set('idpeticion', id.toString()); 
  
    return this._http.delete(url, { headers: headers, params: params });
  }
  
}
