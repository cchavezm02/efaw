import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TransaccionService } from '../../../services/transaccion.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-cantidadtransaccionesporfecha',
  imports: [BaseChartDirective],
  templateUrl: './cantidadtransaccionesporfecha.html',
  styleUrl: './cantidadtransaccionesporfecha.css'
})
export class Cantidadtransaccionesporfecha implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.transaccionService.getCantidadPorFecha().subscribe(data => {
      this.barChartLabels = data.map(item => item.fecha);
      this.barChartData = [{
        data: data.map(item => item.cantidadTransacciones),
        label: 'Cantidad de Transacciones',
        backgroundColor: ['#4CAF50'],
        borderColor: '#2e7d32',
        borderWidth: 1
      }];
    });
  }
}
