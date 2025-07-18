import { User} from "../models/user"

export class ObjetivoAhorro{
    objetivoId: number = 0;
    nombreMeta: string = "";
    montoMeta: number = 0;
    fechaInicio: Date=new Date(Date.now());
    fechaFin: Date=new Date(Date.now());
    montoActual: number = 0;
    estadoObjetivo: string = "";
    user: User = new User()    
}