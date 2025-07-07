import { Categoria } from "../models/categoria";

export class Servicio {
    idService: number = 0;
    nameService: string = "";
    nameCompanyService: string = "";
    category: Categoria = new Categoria(); // Relación con la clase Categoria
}