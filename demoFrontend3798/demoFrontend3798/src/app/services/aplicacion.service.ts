import { Injectable } from '@angular/core';
import { envirnoment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Aplicacion } from '../models/aplicacion';
import { HttpClient } from '@angular/common/http';
import { CantidadDTO } from '../models/cantidadDTO';

const base_url = envirnoment.base;

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  private url = `${base_url}/aplicaciones`;
  private listaCambio = new Subject<Aplicacion[]>();


  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Aplicacion[]>(`${this.url}/listas`);
  }

  insert(m: Aplicacion) {
    return this.http.post(`${this.url}/registra`, m);
  }

  setList(listaNueva: Aplicacion[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }

  getQuantity():Observable<CantidadDTO[]>{
    return this.http.get<CantidadDTO[]>(`${this.url}/cantidades`);
  }
}