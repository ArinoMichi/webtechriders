import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(
    private _http: HttpClient
  ) { }

  getCursos(): Observable<any>{
    var request = "api/cursos"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertCurso(curso: Curso, token: string): Observable<any>{
    var json = JSON.stringify(curso)
    var request = "api/cursos"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.post(url, json, {headers: headers})
  }

  updateCurso(curso: Curso, token: string): Observable<any>{
    var json = JSON.stringify(curso)
    var request = "api/cursos"
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', "bearer " + token)
    return this._http.put(url, json, {headers: headers})
  }

  getCurso(id: number): Observable<any>{
    var request = "api/cursos/" + id
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  deleteCurso(id: number, token: string,): Observable<any>{
    var request = "api/cursos/" + id
    var url = environment.urlApi + request
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers})
  }
}
