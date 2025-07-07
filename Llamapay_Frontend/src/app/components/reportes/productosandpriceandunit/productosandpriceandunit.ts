import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';
import { ProduccionInfoDTO } from '../../../models/productoinfodto';
@Component({
  selector: 'app-productosandpriceandunit',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './productosandpriceandunit.html',
  styleUrl: './productosandpriceandunit.css'
})
export class Productosandpriceandunit implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true
  }
  barChartLabels: string[] = []
  barChartType: ChartType = 'bar'
  barChartLegend = true
  barChartData: ChartDataset[] = []

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.productosandpriceandunit().subscribe({
      next: (data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          this.barChartLabels = data.map((item, index) => {
            const itemAny = item as any;
            const producto = itemAny.nombreproducto || `Producto ${index + 1}`;
            const tienda = itemAny.nombretienda || `Tienda ${index + 1}`;
            return `${producto} - ${tienda}`;
          });
          
          this.barChartData = [
            {
              data: data.map(item => {
                const itemAny = item as any;
                return itemAny.totalUnidades || 0;
              }),
              label: 'Total Unidades',
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

  getTotalUnidades(): number {
    if (this.barChartData && this.barChartData[0]?.data) {
      return this.barChartData[0].data.reduce((total: number, value: any) => total + (Number(value) || 0), 0);
    }
    return 0;
  }

  getTiendas(): number {
    if (this.barChartLabels) {
      const tiendas = new Set();
      this.barChartLabels.forEach(label => {
        const tiendaName = label.split(' - ')[1];
        if (tiendaName) {
          tiendas.add(tiendaName);
        }
      });
      return tiendas.size;
    }
    return 0;
  }
}