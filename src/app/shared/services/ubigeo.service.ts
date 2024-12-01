import { Departamento } from '@/types/departamento.interface';
import { Distrito } from '@/types/distrito.interface';
import { Provincia } from '@/types/provincia.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UbigeoService {



    API = environment.API.concat("/ubigeo")
    constructor(private readonly httpClient: HttpClient) { }

    public getDepartamentos(): Observable<Departamento[]> {

        return this.httpClient
            .get<Departamento[]>(this.API.concat("/departments"))

    }

    public getProvincias(departamentId: string): Observable<Provincia[]> {

        return this.httpClient
            .get<Provincia[]>(this.API.concat("/provinces/").concat(departamentId))

    }

    public getDistritos(provinceId: string): Observable<Distrito[]> {

        return this.httpClient
            .get<Distrito[]>(this.API.concat("/districts/").concat(provinceId))

    }

}