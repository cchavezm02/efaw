import { Component } from '@angular/core';
import { CategoriaService } from '../../../services/categoria.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  
  selector: 'app-categoria',
  imports: [BaseChartDirective, FormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
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

  mes: number | null = null;
  anio: number | null = null;
  
  constructor(private cS: CategoriaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    let url = '/montoxcategoria';
    let params: string[] = [];
    
    if (this.mes !== null && this.mes > 0) {
      params.push(`mes=${this.mes}`);
    }
    
    if (this.anio !== null && this.anio > 0) {
      params.push(`anio=${this.anio}`);
    }
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    this.cS['http'].get<any[]>(`${this.cS['url']}${url}`).subscribe({
      next: (data) => {
        this.barChartLabels = data.map(item => item.nameCategory);
        this.barChartData = [{
          data: data.map(item => item.totalGasto),
          label: 'Gastos por Categoría',
          backgroundColor: this.backgroundColors.slice(0, data.length),
          borderColor: this.backgroundColors.slice(0, data.length),
          borderWidth: 2
        }];
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        alert('Error: Debes proporcionar al menos el mes o el año.');
      }
    });
  }

  aplicarFiltros(): void {
    if (this.mes === null && this.anio === null) {
      alert('Debes proporcionar al menos el mes o el año.');
      return;
    }
    this.cargarDatos();
  }

  limpiarFiltros(): void {
    this.mes = null;
    this.anio = null;
    this.barChartLabels = [];
    this.barChartData = [];
  }

}
