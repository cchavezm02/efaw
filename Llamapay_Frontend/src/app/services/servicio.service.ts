import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Servicio } from '../models/servicio';
import { environment } from "../../environments/environment";
import { MontoServicioDTO } from "../models/montoserviciodto";

const base_url=environment.base;
@Injectable({
  providedIn: "root",  
})

export class ServicioService {
  private listaCambio = new Subject<Servicio[]>(); //1er paso
  private url=`${base_url}/servicios`
  constructor(private http: HttpClient) {}
  //listar servicios
  list(){
    return this.http.get<Servicio[]>(this.url); 
  }
  //insertar servicio
  insert(s:Servicio){ //2do paso
    return this.http.post(`${this.url}/registra`,s);
  }
  setList(listaNueva: Servicio[]) { //3er paso
    this.listaCambio.next(listaNueva);
  }
  getList() { //4to paso
    return this.listaCambio.asObservable();
  }

  //actualizar servicio
  listId(id: number) {
    return this.http.get<Servicio>(`${this.url}/${id}`)
  }
  update(se: Servicio) {
    return this.http.put(this.url, se);
  }
  deleteS(id:number) {
    return this.http.delete(`${this.url}/${id}`);
  }

    montoservicio(): Observable<MontoServicioDTO[]> {
    return this.http.get<MontoServicioDTO[]>(`${this.url}/servicioxcategoria`);
  }
}