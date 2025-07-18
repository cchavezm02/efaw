import { TipoTransaccion } from '../models/tipotransaccion';

export class Transaccion {
    idTransaccion: number=0;
    fechaTransaccion: Date=new Date();
    montoTransaccion: number=0;
    descripcionTransaccion: string='';
    tipotransaccion: TipoTransaccion = new TipoTransaccion();


/* Relacionales comentaas hasta que existan los modelos correspondientes
  // tipocuenta: TipoCuenta;
  // metodopago: MetodoPago;
  // servicio: Servicio;
  // tipotransaccion: TipoTransaccion;

    import { TipoCuenta } from './tipocuenta';
    import { MetodoPago } from './metodopago';
    import { Servicio } from './servicio';
    import { TipoTransaccion } from './tipotransaccion';

  // */
}