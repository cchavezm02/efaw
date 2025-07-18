import { Server } from "../models/Server"

export class Aplicacion{
    idApp:number=0
    nameApp:string=""
    stateApp:boolean=false
    implementationDateApp:Date=new Date()
    amountApp:number=0
    typeApp:string=""
    server:Server=new Server()
}