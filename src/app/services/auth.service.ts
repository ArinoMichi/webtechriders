import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient
  ) { }

  auth(usuario: Auth): Observable<any> {
    var request = "api/auth/login";
    var url = environment.urlApi + request;
    var json = JSON.stringify(usuario);
    var headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post(url, json, { headers: headers });
  }

  login(usuario: Auth): Observable<any> {
    return this.auth(usuario);
  }
}
