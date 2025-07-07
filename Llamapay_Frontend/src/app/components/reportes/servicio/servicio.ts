import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ServicioService } from '../../../services/servicio.service';
import { MontoServicioDTO } from '../../../models/montoserviciodto';
@Component({
  selector: 'app-servicio',
  imports: [BaseChartDirective],
  templateUrl: './servicio.html',
  styleUrl: './servicio.css'
})
export class ServiciosReporte implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'pie'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  backgroundColors: string[] = [
    '#4CAF50',
    '#66BB6A',
    '#2E7D32',
    '#81C784',
    '#388E3C',
    '#A5D6A7',
    '#1B5E20',
    '#C8E6C9',
    '#4DB6AC',
    '#26A69A'
  ]

  constructor(private sS: ServicioService) { }

  ngOnInit(): void {
    this.sS.montoservicio().subscribe(data => {
      this.barChartLabels = data.map(item => item.nameCategory);
      this.barChartData = [{
        data: data.map(item => item.cantidadServicio),
        label: 'Servicios por Categoría',
        backgroundColor: this.backgroundColors.slice(0, data.length),
        borderColor: this.backgroundColors.slice(0, data.length),
        borderWidth: 2
      }];
    });
  }

}