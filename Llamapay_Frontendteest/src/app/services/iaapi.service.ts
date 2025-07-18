import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaApiService {

  constructor(private http: HttpClient) { }

  sendToAI(prompt: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer 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',
    'Content-Type': 'application/json',
  });

  const body = {
      model: 'deepseek/deepseek-r1:free',
      messages: [
        { role: 'system', content: 'Eres un asistente experto en finanzas, economia y ventas de productos.' },
        { role: 'user', content: prompt }
      ]
    };

  return this.http.post('https://openrouter.ai/api/v1/chat/completions', body, { headers });
}
}