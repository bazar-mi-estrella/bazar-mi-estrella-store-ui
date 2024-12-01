import { Client } from "@/types/client.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    API = environment.API.concat("/order")

    constructor(private readonly httpClient: HttpClient) { }

    public save(data: Client): Observable<Client> {
        return this.httpClient.post<Client>(this.API, data)
    }

    public findByEmail(email: string): Observable<Client> {
        return this.httpClient.get<Client>(this.API.concat("/email"), { params: { email } })
    }
}