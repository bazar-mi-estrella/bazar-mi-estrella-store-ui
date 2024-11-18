import { Client } from "@/types/client.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    API = environment.API.concat("/client")

    constructor(private readonly httpClient: HttpClient) { }

    public save(data: Client): Observable<Client> {
        return this.httpClient.post<Client>(this.API, data)
    }
}