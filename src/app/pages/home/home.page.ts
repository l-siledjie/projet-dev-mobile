import { Component } from '@angular/core';
import { OperationService } from '../../services/operation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  depenseOperations: any[] = [];
  recetteOperations: any[] = [];
  empruntOperations: any[] = [];
  pretOperations: any[] = [];
  epargneOperations: any[] = [];

  operationGroups: any[] = [];
  dailyTotal: number = 0;
  weeklyTotal: number = 0;
  monthlyTotal: number = 0;
  yearlyTotal: number = 0;

  constructor(private operationService: OperationService) {}

  ionViewWillEnter() {
    this.loadOperations();
  }

  loadOperations() {
    this.operationGroups = [
      { title: 'Dépenses', operations: this.operationService.getOperationsByType('depense'), icon: 'wallet-outline' },
      { title: 'Recettes', operations: this.operationService.getOperationsByType('recette'), icon: 'cash-outline' },
      { title: 'Emprunts', operations: this.operationService.getOperationsByType('emprunt'), icon: 'archive-outline' },
      { title: 'Prets', operations: this.operationService.getOperationsByType('pret'), icon: 'card-outline' },
      { title: 'Epargnes', operations: this.operationService.getOperationsByType('epargne'), icon: 'bag-check-outline' },
    ];

    this.calculateTotals();
  }

  calculateTotals() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = this.getWeekNumber(currentDate);
    const currentDay = currentDate.getDate();

    this.dailyTotal = this.calculateTotalByPeriod('day', currentDay);
    this.weeklyTotal = this.calculateTotalByPeriod('week', currentWeek);
    this.monthlyTotal = this.calculateTotalByPeriod('month', currentMonth);
    this.yearlyTotal = this.calculateTotalByPeriod('year', currentYear);
  }

  calculateTotalByPeriod(period: string, value: number): number {
    let total = 0;

    this.operationGroups.forEach((group) => {
      total += group.operations
        .filter((operation) => this.isInPeriod(operation.timestamp, period, value))
        .reduce((sum, operation) => sum + operation.amount, 0);
    });

    return total;
  }

  isInPeriod(timestamp: number, period: string, value: number): boolean {
    const operationDate = new Date(timestamp);

    switch (period) {
      case 'day':
        return operationDate.getDate() === value;
      case 'week':
        return this.getWeekNumber(operationDate) === value;
      case 'month':
        return operationDate.getMonth() === value;
      case 'year':
        return operationDate.getFullYear() === value;
      default:
        return false;
    }
  }

  getWeekNumber(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const weekNumber = Math.floor(diff / oneDay / 7) + 1;
    return weekNumber;
  }

  hasData(): boolean {
    return this.operationGroups.some((group) => group.operations.length > 0);
  }

}
