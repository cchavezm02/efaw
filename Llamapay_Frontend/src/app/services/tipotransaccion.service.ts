import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoTransaccion } from '../models/tipotransaccion';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoTransaccionService {
  private url: string = `${environment.base}/tipotransacciones`;

  private listaCambio = new Subject<TipoTransaccion[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<TipoTransaccion[]> {
    return this.http.get<TipoTransaccion[]>(this.url);
  }

  listId(id: number): Observable<TipoTransaccion> {
    return this.http.get<TipoTransaccion>(`${this.url}/${id}`);
  }

  insert(tipo: TipoTransaccion): Observable<void> {
    return this.http.post<void>(this.url, tipo);
  }

  update(tipo: TipoTransaccion): Observable<void> {
    return this.http.put<void>(this.url, tipo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  setList(lista: TipoTransaccion[]): void {
    this.listaCambio.next(lista);
  }

  getList(): Observable<TipoTransaccion[]> {
    return this.listaCambio.asObservable();
  }
}