import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  API = environment.API.concat("/email")

  constructor(private readonly httpClient: HttpClient) { }

  public sendMessage(recipient: string, sender: string, subject: string, content: string): Observable<number> {
    const httpParams = new HttpParams()
      .set("recipient", recipient) // Destinatario del mensaje
      .set("sender", sender) // Remitente del mensaje
      .set("subject", subject) // Asunto del mensaje
      .set("content", content) // Contenido del mensaje
    return this.httpClient.get<number>(this.API.concat("/send"), { params: httpParams })
  }

}
