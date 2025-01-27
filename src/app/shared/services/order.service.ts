import { Client } from "@/types/client.interface";
import { OrderDTO } from "@/types/order-interface";
import { OrderPostDTO } from "@/types/order-post.interface";
import { OrderTrayDTO } from "@/types/order-tray-interface";
import { ResponseDTO } from "@/types/responseDTO";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    API = environment.API.concat("/order")
    API_STRIPE = environment.API.concat("/stripe")

    constructor(private readonly httpClient: HttpClient) { }

    public save(data: OrderPostDTO): Observable<ResponseDTO<OrderDTO>> {
        return this.httpClient.post<ResponseDTO<OrderDTO>>(this.API, data)
    }

    public findById(idOrder: string): Observable<OrderDTO> {
        return this.httpClient.get<OrderDTO>(this.API.concat("/").concat(idOrder))
    }

    public getByClientId(idClient: string): Observable<OrderTrayDTO[]> {
        return this.httpClient.get<OrderTrayDTO[]>(this.API.concat("/byclient/").concat(idClient))
    }

    public createSesionStripe(idorden: string): Observable<ResponseDTO<string>> {
        return this.httpClient.post<ResponseDTO<string>>(this.API_STRIPE.concat(`/create-checkout-session?idOrden=${idorden}`), {})
    }

    public getSesionStripe(idSesion: string,idOrden:string): Observable<any> {
        let params: HttpParams = new HttpParams(); // Inicializamos el HttpParams
        params = params.append('sessionId', idSesion);
        params = params.append('idOrden', idOrden);
        params = params.append('update', true);
        return this.httpClient.get<any>(this.API_STRIPE.concat(`/session?${params}`))
    }


}