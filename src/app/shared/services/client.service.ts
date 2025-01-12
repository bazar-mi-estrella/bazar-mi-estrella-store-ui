import { Client } from "@/types/client.interface";
import { ResponseDTO } from "@/types/responseDTO";
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

    public save(data: Client): Observable<ResponseDTO<Client>> {
        return this.httpClient.post<ResponseDTO<Client>>(this.API, data)
    }

    public findByEmail(email: string): Observable<Client> {
        return this.httpClient.get<Client>(this.API.concat("/email"), { params: { email } })
    }
}