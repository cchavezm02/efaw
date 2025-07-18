import { User} from "../models/user"
import { Tienda } from '../models/tienda';

export class Producto {
  idproducto: number=0;;
  nombreproducto: String="";
  descripcion: String="";
  unidadmedida: String="";
  precioproducto:number=0;;
  us: User= new User();
  td: Tienda= new Tienda();
}