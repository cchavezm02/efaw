import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment"; 
import { HttpClient } from "@angular/common/http";
import { Rol } from "../models/rol";
import { Subject } from "rxjs";

const base_url=environment.base;

@Injectable({
  providedIn: "root",  
})
export class RolService{
    private url = `${base_url}/roles`;
    private listaCambio = new Subject<Rol[]>();
    constructor(private http: HttpClient) { }
    list() {
    return this.http.get<Rol[]>(this.url);
    }
    insert(r: Rol) {
        return this.http.post(`${this.url}/registrar`, r);
    }
    getList() {
        return this.listaCambio.asObservable();
    }
    setList(listaNueva: Rol[]) {
        this.listaCambio.next(listaNueva);
    }
    eliminarRol(id: number) {
    return this.http.delete(`${this.url}/eliminar/${id}`);
    }
    listaId(id: number) {
        return this.http.get<Rol>(`${this.url}/${id}`);
    }
    update(r: Rol) {
        return this.http.put(this.url, r);
    }
    obtenerPorTipoRol(tipo: string) {
  return this.http.get<any[]>(`${this.url}/tipoRol/${tipo}`);
}

obtenerPorUsuario(id: number) {
  return this.http.get<any[]>(`${this.url}/usuario/${id}`);
}
    
}