import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment"; 
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Subject } from "rxjs";
import { SerchingUserForYearBirthdayDTO } from "../models/serchinguserforyearbirthdayDTO";

const base_url=environment.base;
@Injectable({
  providedIn: "root",  
})

export class UserService {
private listaCambio = new Subject<User[]>(); //1er paso
  private url=`${base_url}/users`;
  constructor(private http: HttpClient) {}
  
  list(){
        return this.http.get<User[]>(this.url);
        }
        //insertar user
    insert(u:User){ //2do paso
        return this.http.post(`${this.url}/register-user`,u);
        }
    setList(listaNueva: User[]) { //3er paso
        this.listaCambio.next(listaNueva);
        }
    getList() { //4to paso
        return this.listaCambio.asObservable();
        }
    listId(id: number) {
      return this.http.get<User>(`${this.url}/${id}`)
    }

    update(u: User) {
      return this.http.put(this.url, u)
    }

    deleteS(id:number) {
      return this.http.delete(`${this.url}/${id}`)
    }
    getBirthdaysByRange(inicio: string, fin: string) {
  const params = { inicio, fin };
  return this.http.get<SerchingUserForYearBirthdayDTO[]>(`${this.url}/Searching-Date-years-users`, { params });
}
  findByUsername(username: string) {
    return this.http.get<User>(`${this.url}/username/${username}`);
  }

  getUserRole(): string {
  const stored = sessionStorage.getItem('rol');
  return stored ? stored.replace(/"/g, '') : '';
}

getUsername(): string {
  const stored = sessionStorage.getItem('username');
  return stored ? stored.replace(/"/g, '') : '';
}
}