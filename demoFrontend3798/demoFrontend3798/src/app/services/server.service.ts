import { Injectable } from '@angular/core';
import { envirnoment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Server } from '../models/Server';
import { HttpClient } from '@angular/common/http';
import { MontoDTO } from '../models/montoDTO';

const base_url = envirnoment.base;

@Injectable({
  providedIn: 'root'
})
export class ServerService {
private url = `${base_url}/servidores`;

private listaCambio = new Subject<Server[]>();

  constructor(private http: HttpClient) { }
   list() {
    return this.http.get<Server[]>(this.url);
  }

  insert(s: Server) {
    return this.http.post(this.url, s);
  }

  setList(listaNueva: Server[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Server>(`${this.url}/${id}`);
  }
  update(s: Server) {
    return this.http.put(this.url, s);
  }
   delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  searchProvider(p:string){
    const params = { proveedor: p };
    return this.http.get<Server[]>(`${this.url}/busquedas`, { params });

  }
  getSum():Observable<MontoDTO[]>{
    return this.http.get<MontoDTO[]>(`${this.url}/montos`);
  }
}
