import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'
import { MetodoPagoService } from '../../../services/metodopago.service';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-reportesmetodopago',
  imports: [BaseChartDirective, FormsModule, CommonModule],
  templateUrl: './reportesmetodopago.html',
  styleUrl: './reportesmetodopago.css'
})
export class Reportesmetodopago implements OnInit{
  barChartOptions: ChartOptions = { responsive: true };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  users: any[] = [];
  selectedUserId: number = 0;

  constructor(
    private mpS: MetodoPagoService,
    private userService: UserService // <-- Inyecta correctamente
  ) {}

  ngOnInit(): void {
    this.userService.list().subscribe(users => {
      this.users = users;
      if (this.users.length > 0) {
        this.selectedUserId = this.users[0].userId;
        this.loadChartData(this.selectedUserId);
      }
    });
  }

  loadChartData(userId: number): void {
    this.mpS.getQuantitymetodspayforusers(userId).subscribe(data => {
      this.barChartLabels = data.map(item => item.nombre);
      this.barChartData = [{
        data: data.map(item => item.id),
        label: 'Cantidad método pagos por usuarios',
        backgroundColor: ['#CC0000', '#FF0000'],
        borderColor: '#CC0000',
        borderWidth: 1
      }];
    });
  }

  onUserChange(event: any): void {
    this.loadChartData(this.selectedUserId);
  }

  totalMetodos(): number {
  return this.barChartData[0]?.data?.reduce((a: any, b: any) => a + b, 0) || 0;
}

}