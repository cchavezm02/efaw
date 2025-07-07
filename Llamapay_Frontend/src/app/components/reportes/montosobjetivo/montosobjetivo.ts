import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';
import { MetaCestaPrdDTO } from '../../../models/metacestaprdto';
@Component({
  selector: 'app-montosobjetivo',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './montosobjetivo.html',
  styleUrl: './montosobjetivo.css'
})
export class Montosobjetivo implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Monto (s/.)'
        }
      }
    }
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartData: ChartDataset[] = []
  datosOriginales: MetaCestaPrdDTO[] = []

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.metacesta().subscribe({
      next: (data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.datosOriginales = data;
          this.barChartLabels = data.map(item => item.nombreusuario);
          this.barChartData = [
            {
              data: data.map(item => item.montoobjetivo),
              label: 'Monto Objetivo',
              backgroundColor: '#4CAF50',
              borderColor: '#2E7D32',
              borderWidth: 2
            },
            {
              data: data.map(item => item.montototal),
              label: 'Monto Cesta',
              backgroundColor: '#81C784',
              borderColor: '#388E3C',
              borderWidth: 2
            }
          ];
        } else {
          this.barChartLabels = ['Sin datos'];
          this.barChartData = [
            {
              data: [0],
              label: 'Sin datos disponibles',
              backgroundColor: ['#CCCCCC'],
              borderColor: '#999999',
              borderWidth: 1
            }
          ];
        }
      },
      error: (error) => {
        this.barChartLabels = ['Error'];
        this.barChartData = [
          {
            data: [0],
            label: 'Error al cargar datos',
            backgroundColor: ['#FF0000'],
            borderColor: '#CC0000',
            borderWidth: 1
          }
        ];
      }
    });
  }

  obtenerTotalUsuarios(): number {
    return this.datosOriginales.length;
  }

  obtenerPromedioObjetivo(): number {
    if (this.datosOriginales.length === 0) return 0;
    const suma = this.datosOriginales.reduce((total, item) => total + item.montoobjetivo, 0);
    return suma / this.datosOriginales.length;
  }

  obtenerUsuariosQueAlcanzaron(): number {
    return this.datosOriginales.filter(item => item.montototal >= item.montoobjetivo).length;
  }

  obtenerComparacionUsuarios(): any[] {
    return this.datosOriginales.map(item => {
      const alcanzado = item.montototal >= item.montoobjetivo;
      const diferencia = alcanzado ? 
        (item.montototal - item.montoobjetivo) : 
        (item.montoobjetivo - item.montototal);
      const porcentaje = Math.min((item.montototal / item.montoobjetivo) * 100, 100);
      
      return {
        nombre: item.nombreusuario,
        alcanzado: alcanzado,
        diferencia: diferencia,
        porcentaje: porcentaje,
        montoActual: item.montototal,
        montoObjetivo: item.montoobjetivo
      };
    });
  }

}
