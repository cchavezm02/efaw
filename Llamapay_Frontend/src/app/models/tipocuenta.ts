import { User} from '../models/user'

export class TipoCuenta {
  idTipoCuenta: number = 0;
  nombreTipoCuenta: string = '';
  numeroTipoCuenta: string = '';
  tipodeCuenta: string = '';
  saldoTipoCuenta: number = 0;
  monedaTipoCuenta: string = '';
  user: User = new User();
}