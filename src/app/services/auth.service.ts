import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkAuthentication());

  notifyAuthenticationChange(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  constructor(
    private _http: HttpClient
  ) { }

  // Métodos de autenticación

  private checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

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

  logout(): void {
    // Limpiar el token
    localStorage.removeItem('token');

    // Notificar el cambio en el estado de autenticación
    this.isAuthenticatedSubject.next(false);
  }
}
