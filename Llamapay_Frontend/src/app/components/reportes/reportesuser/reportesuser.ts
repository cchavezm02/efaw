import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportesuser',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './reportesuser.html',
  styleUrl: './reportesuser.css'
})
export class ReportesuserComponent implements OnInit {
  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de usuarios'
        }
      }
    }
  };
  barChartLegend = true;
  barChartType: ChartType = 'bar';
  totalPorMes: number[] = new Array(12).fill(0);

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const inicio = '1985-01-01';
    const fin = '2025-12-31';

    this.userService.getBirthdaysByRange(inicio, fin).subscribe(data => {
      data.forEach(user => {
        const mes = new Date(user.diaNacimiento).getMonth();
        this.totalPorMes[mes]++;
      });

      this.barChartLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      this.barChartData = [
        {
          data: this.totalPorMes,
          label: 'Cantidad de usuarios',
          backgroundColor: '#4CAF50',
          borderColor: '#2E7D32',
          borderWidth: 2
        }
      ];
    });
  }

  obtenerTotalUsuarios(): number {
    return this.totalPorMes.reduce((acc, curr) => acc + curr, 0);
  }

  obtenerMesesActivos(): number {
    return this.totalPorMes.filter(val => val > 0).length;
  }
}
