import { Component } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  
  selector: 'app-categoria',
  imports: [BaseChartDirective],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class CategoriaReporte implements OnInit {
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
  
  constructor(private cS: CategoriaService) { }

  ngOnInit(): void {
    this.cS.montocategoria().subscribe(data => {
      this.barChartLabels = data.map(item => item.nameCategory);
      this.barChartData = [{
        data: data.map(item => item.totalGasto),
        label: 'Gastos por Categoría',
        backgroundColor: this.backgroundColors.slice(0, data.length),
        borderColor: this.backgroundColors.slice(0, data.length).map(color => color.replace('0.8', '1')),
        borderWidth: 2
      }];
    });
  }

}