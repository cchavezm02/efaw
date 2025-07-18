export default class Formulario {
    constructor(nombre, monto, fecha, descripcion){
        this.nombre = nombre;
        this.monto = monto;
        this.fecha = fecha;
        this.descripcion = descripcion;

    }

    getNombre() {
        return this.nombre;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getMonto(){
        return this.monto;
    }

    getFecha(){
        return this.fecha;
    }

    setNombre(value) {
        this.nombre = value;
    }

    setNombre(value) {
        this.descripcion = value;
    }

}