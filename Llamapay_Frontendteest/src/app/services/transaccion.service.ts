import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaccion } from '../models/transaccion';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from "../../environments/environment";

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private url = `${base_url}/transacciones`;


  private listarCambio = new BehaviorSubject<Transaccion[]>([]);
  private idCambio = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Transaccion[]>(this.url);
  }

  insert(t: Transaccion) {
    return this.http.post(this.url + '/registrar', t);
  }

  update(t: Transaccion) {
    return this.http.put(this.url + '/modificar', t);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
  }

  getById(id: number) {
    return this.http.get<Transaccion>(`${this.url}/${id}`);
  }


  setList(listaNueva: Transaccion[]) {
    this.listarCambio.next(listaNueva);
  }

  getList() {
    return this.listarCambio.asObservable();
  }


  setId(id: number) {
    this.idCambio.next(id);
  }

  getId() {
    return this.idCambio.asObservable();
  }

   getCantidadPorFecha(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/cantidad-por-fecha`);
  }

  getMontoPorFecha(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/monto-por-fecha`);
  }
}