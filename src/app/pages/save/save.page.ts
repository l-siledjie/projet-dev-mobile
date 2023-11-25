import { Component, OnInit } from '@angular/core';
/*import * as fs from 'fs';*/
@Component({
  selector: 'app-save',
  templateUrl: './save.page.html',
  styleUrls: ['./save.page.scss'],
})
export class SavePage implements OnInit {
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
  }
    
    
    
    
    
    /* this.transactions.push({
      type,
      libelle,
      montant,
      date: new Date()
    });
    

   fs.writeFile('transactions.json', JSON.stringify(this.transactions, null, 2), err => {
      if (err) {
        throw err;
      }
      console.log('Transactions saved.');
    });
    */
  }

