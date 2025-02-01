import { RefundPostDTO } from '@/types/refund-post-interface';
import { ResponseDTO } from '@/types/responseDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefundService {


  API = environment.API.concat("/refund")

  constructor(private readonly httpClient: HttpClient) { }

  public save(data: RefundPostDTO): Observable<ResponseDTO<number>> {
    return this.httpClient.post<ResponseDTO<number>>(this.API, data)
  }


}
