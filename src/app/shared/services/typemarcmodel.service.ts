import { TypeMarcModel } from '@/types/typemarcmodel.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TypeMarcaModelService {

    private  dataSubject = new BehaviorSubject<TypeMarcModel[]>([]); // BehaviorSubject para almacenar los datos
    private dataLoaded = false; // Bandera para evitar solicitudes duplicadas

    API = environment.API.concat("/typemarcmodel")
    constructor(private readonly httpClient: HttpClient) { }

    public getAllTypes(): Observable<TypeMarcModel[]> {
        if (this.dataLoaded && this.dataSubject.value.length <= 0) return this.dataSubject.asObservable(); // Devuelve el Observable con los datos

        return this.httpClient
            .get<TypeMarcModel[]>(this.API.concat("/types"))
            .pipe(
                tap(data => {
                    this.dataSubject.next(data); // Actualiza el BehaviorSubject con los datos cargados
                    this.dataLoaded = true; // Marca como cargado
                })
            )


    }


}