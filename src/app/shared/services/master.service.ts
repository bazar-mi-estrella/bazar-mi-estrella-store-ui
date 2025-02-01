import { Master } from '@/types/master.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  API = environment.API.concat("/master")


  constructor(private readonly httpClient: HttpClient) { }

  public findByPrefixAndCorrelatives(prefix: number, correlatives: number[] = []): Observable<Master[]> {

    const httpParams = new HttpParams()
      .set("prefix", prefix)
      .set("correlatives", correlatives.toString())

    return this.httpClient.get<Master[]>(this.API.concat("/find_by_prefix"), { params: httpParams })
  }

}
