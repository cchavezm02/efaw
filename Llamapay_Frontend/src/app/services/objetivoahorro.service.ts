import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment"; 
import { HttpClient } from "@angular/common/http";
import { ObjetivoAhorro } from '../models/objetivoahorro';
import { Subject } from "rxjs";

const base_url = environment.base;

@Injectable({
  providedIn: "root",  
})
export class ObjetivoAhorroService {
  private url = `${base_url}/ObjetivoAhorro`;
  private listaCambio = new Subject<ObjetivoAhorro[]>();

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ObjetivoAhorro[]>(this.url);
  }

  insert(o: ObjetivoAhorro) {
    return this.http.post(this.url, o); // CORREGIDO
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: ObjetivoAhorro[]) {
    this.listaCambio.next(listaNueva);
  }

  deleteS(id: number) {
    return this.http.delete(`${this.url}/Eliminar/${id}`);
  }

  listaId(id: number) {
    return this.http.get<ObjetivoAhorro>(`${this.url}/usuario/${id}`);
  }

  update(o: ObjetivoAhorro) {
    return this.http.put(`${this.url}/actualizar`, o);
  }

  getTotalAhorradoPorUsuario() {
    return this.http.get<any[]>(`${this.url}/total-ahorrado-por-usuario`);
  }

  // Reporte: objetivos por mes
  getObjetivosPorMes() {
    return this.http.get<any[]>(`${this.url}/objetivos-por-mes`);
  }
}