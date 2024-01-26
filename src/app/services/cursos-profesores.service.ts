import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CursoProfesor } from '../models/curso-profesor.model';

@Injectable({
  providedIn: 'root'
})
export class CursosProfesoresService {

  constructor(
    private _http: HttpClient
  ) { }

  getCursosProfesores(): Observable<any>
  {
    var request = "api/cursosprofesores"
    var url = environment.urlApi + request
    return this._http.get(url)
  }

  insertCursoProfesor(cursoProfesor: CursoProfesor, token: string): Observable<any>
  {
    var request = "api/cursosprofesores"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idcurso', cursoProfesor.idCurso)
    .append('idprofesor', cursoProfesor.idProfesor)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.post(url, {headers: headers, params: params})
  }

  deleteCursoProfesor(cursoProfesor: CursoProfesor, token: string): Observable<any>
  {
    var request = "api/cursosprofesores"
    var url = environment.urlApi + request
    var params = new HttpParams()
    .append('idcurso', cursoProfesor.idCurso)
    .append('idprofesor', cursoProfesor.idProfesor)
    var headers = new HttpHeaders()
    .set('Authorization', "bearer " + token)
    return this._http.delete(url, {headers: headers, params: params})
  }

  getCursoProfesor(cursoProfesor: CursoProfesor): Observable<any>
  {
    var request = "api/cursosprofesores/find/" + cursoProfesor.idCurso + "/" + cursoProfesor.idProfesor
    var url = environment.urlApi + request
    return this._http.get(url)
  }
}
