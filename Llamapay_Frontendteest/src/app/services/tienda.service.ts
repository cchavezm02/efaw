import { Tienda } from '../models/tienda';
import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private url = `${base_url}/tiendas`
  private ListaCambio = new Subject<Tienda[]>()
  constructor(private http: HttpClient) { }
  list(){
    return this.http.get<Tienda[]>(this.url);
  }
  insert(t:Tienda){ 
    return this.http.post(this.url,t);
  }
  setList(listaNueva: Tienda[]) { 
    this.ListaCambio.next(listaNueva);
  }
  getList() { 
    return this.ListaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Tienda>(`${this.url}/${id}`)
  }

  update(t: Tienda) {
    return this.http.put(this.url, t)
  }
  deleteS(id:number) {
    return this.http.delete(`${this.url}/${id}`)
  }
  searchTienda(t:string){
    return this.http.get<Tienda[]>(`${this.url}/buscar/${t}`)
  }
}