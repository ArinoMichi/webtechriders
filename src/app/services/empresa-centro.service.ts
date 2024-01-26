import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmpresaCentro } from '../models/empresa-centro.model';

@Injectable({
    providedIn: 'root'
})
export class EmpresaCentroService {
    constructor(private _http: HttpClient) { }

    getEmpresasCentros(): Observable<any> {
        var request = 'api/empresascentros';
        var url = environment.urlApi + request;

        return this._http.get(url);
    }
}