import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TransaccionService } from '../../../services/transaccion.service';

@Component({
  selector: 'app-montotransaccionesporfecha',
  imports: [BaseChartDirective],
  standalone: true,
  templateUrl: './montotransaccionesporfecha.html',
  styleUrl: './montotransaccionesporfecha.css'
})
export class Montotransaccionesporfecha implements OnInit {
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.transaccionService.getMontoPorFecha().subscribe(data => {
      this.barChartLabels = data.map(item => item.fecha);
      this.barChartData = [{
        data: data.map(item => item.montoTotal),
        label: 'Monto Total por Fecha',
        backgroundColor: [
          '#2E7D32',
          '#388E3C',
          '#43A047',
          '#4CAF50',
          '#66BB6A',
          '#81C784',
          '#A5D6A7',
          '#C8E6C9'
        ],
        borderColor: '#1B5E20',
        fill: true
      }];
    });
  }
}
