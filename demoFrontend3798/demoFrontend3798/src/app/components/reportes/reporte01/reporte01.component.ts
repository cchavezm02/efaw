import { CommonModule } from '@angular/common';
import { AplicacionService } from '../../../services/aplicacion.service';
import { ChartDataset, ChartOptions, ChartType } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reporte01',
  imports: [BaseChartDirective,CommonModule,MatIconModule,CommonModule],
  templateUrl: './reporte01.component.html',
  styleUrl: './reporte01.component.css'
})
export class Reporte01Component implements OnInit{
   hasData = false;
  barChartOptions:ChartOptions={
    responsive:true
  }

  barChartLabels:string[]=[]
  barChartType:ChartType='doughnut'
  barChartLegend=true
  barChartData:ChartDataset[]=[]


  constructor(private aS:AplicacionService){}
ngOnInit(): void {
    this.aS.getQuantity().subscribe(data=>{
       if (data.length > 0) {
                this.hasData = true;

      this.barChartLabels=data.map(item=>item.nameServer)
      this.barChartData=[
        {
          data:data.map(item=>item.quantityApp),
          label:'Cantidad de aplicaciones',
          backgroundColor:[
    '#CC0000', // Rojo intenso
    '#FF0000', // Rojo estándar

    '#990000', // Rojo oscuro
    '#FF9999', // Rojo claro
    '#FF6666', // Rojo suave
    '#FF3333', // Rojo medio
    '#660000', // Rojo muy oscuro
    '#B22222', // Rojo fuego
          ],
           borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        }
        
      ]
       }else{
                this.hasData = false;

       }

    })
}
}
