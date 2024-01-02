// operation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  getOperations(): any[] {
    const operationsString = localStorage.getItem('operations');
    return operationsString ? JSON.parse(operationsString) : [];
  }

  private getNextId(type: string): number {
    const operations = this.getOperationsByType(type);
    return operations.length + 1;
  }

  addOperation(type: string, label: string, amount: number) {
    const operations = this.getOperations();
    const operation = {
      id: this.getNextId(type),
      type,
      label,
      amount,
      timestamp: new Date().toISOString()
    };

    operations.push(operation);
    localStorage.setItem('operations', JSON.stringify(operations));

  }

  getOperationsByType(type: string): any[] {
    const operations = this.getOperations();
    return operations.filter(operation => operation.type === type);
  }

  recalculateWalletScore(): number {
    const operations = this.getOperations();
    const currentYear = new Date().getFullYear();

    const walletScore = operations.reduce((score, operation) => {
      if (operation.type === 'recette' || operation.type === 'emprunt') {
        return score + operation.amount;
      } else {
        return score - operation.amount;
      }
    }, 0);

    return walletScore;
  }
}
