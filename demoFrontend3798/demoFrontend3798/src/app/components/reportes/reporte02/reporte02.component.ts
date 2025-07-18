import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-reporte02',
  imports: [BaseChartDirective],
  templateUrl: './reporte02.component.html',
  styleUrl: './reporte02.component.css'
})
export class Reporte02Component implements OnInit{
  barChartOptions:ChartOptions={
    responsive:true
  }

  barChartLabels:string[]=[]
  barChartType:ChartType='doughnut'
  barChartLegend=true
  barChartData:ChartDataset[]=[]


  constructor(private sS:ServerService){}
ngOnInit(): void {
    this.sS.getSum().subscribe(data=>{
      this.barChartLabels=data.map(item=>item.nameServer)
      this.barChartData=[
        {
          data:data.map(item=>item.amountTotal),
          label:'Monto invertido',
          backgroundColor:[
         '#FF9999', // Rojo claro
    '#FF6666', // Rojo suave
    '#FF3333', // Rojo medio
    '#FF0000', // Rojo estándar
    '#CC0000', // Rojo intenso
    '#990000', // Rojo oscuro
    '#660000', // Rojo muy oscuro
    '#B22222', // Rojo fuego
          ],
           borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
      ]

    })
}
}
