import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.page.html',
  styleUrls: ['./emprunt.page.scss'],
})
export class EmpruntPage implements OnInit {
  transactions: any[] = [];

  onSubmit() {
    const type = (document.getElementById('type') as HTMLInputElement).value;
    const libelle = (document.getElementById('libelle') as HTMLInputElement).value;
    const montant = (document.getElementById('montant') as HTMLInputElement).value;

    const transaction = {
      type,
      libelle,
      montant,
      date: new Date()
    };
  
    this.transactions.push(transaction);
  
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }
  clearLocalStorage() {
    localStorage.clear();
  }
  ngOnInit() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    }
}}