import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoCuenta } from '../models/tipocuenta';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {
  private url: string = `${environment.base}/tiposcuentas`;

  private listaCambio = new Subject<TipoCuenta[]>();

  constructor(private http: HttpClient) {}

  list(): Observable<TipoCuenta[]> {
    return this.http.get<TipoCuenta[]>(this.url);
  }

  insert(t: TipoCuenta): Observable<void> {
    return this.http.post<void>(`${this.url}/registrar`, t);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${id}`);
  }

  update(t: TipoCuenta): Observable<void> {
    return this.http.put<void>(`${this.url}/actualizar`, t);
  }

  setList(lista: TipoCuenta[]) {
    this.listaCambio.next(lista);
  }

  getList(): Observable<TipoCuenta[]> {
    return this.listaCambio.asObservable();
  }

  getById(id: number): Observable<TipoCuenta> {
    return this.http.get<TipoCuenta>(`${this.url}/${id}`);
  }

}