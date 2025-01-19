import { Client } from "@/types/client.interface";
import { OrderDTO } from "@/types/order-interface";
import { OrderPostDTO } from "@/types/order-post.interface";
import { ResponseDTO } from "@/types/responseDTO";
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

    public save(data: OrderPostDTO): Observable<ResponseDTO<OrderDTO>> {
        return this.httpClient.post<ResponseDTO<OrderDTO>>(this.API, data)
    }

    public findById(idOrder: string): Observable<OrderDTO> {
        return this.httpClient.get<OrderDTO>(this.API.concat("/").concat(idOrder))
    }

  
}