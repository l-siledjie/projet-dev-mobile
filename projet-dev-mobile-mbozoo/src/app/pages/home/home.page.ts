import { Component, Input } from '@angular/core';

import { saveAs } from 'file-saver';
import { ToastController } from '@ionic/angular';

import { TranslateService } from '@ngx-translate/core';
import { GoogleDriveAuthService } from 'src/app/services/google-drive-auth.service';
import { OperationService } from 'src/app/services/operation.service';




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
  score: number = 0;

  dayTotals: number[] = [0, 0, 0, 0, 0];
  weekTotals: number[] = [0, 0, 0, 0, 0];
  monthTotals: number[] = [0, 0, 0, 0, 0];
  yearTotals: number[] = [0, 0, 0, 0, 0];
  typeTotals: any = {};
selectedLanguage: any;
  pieChartData: { name: string; value: number; }[];


  constructor(private operationService: OperationService, private toastController: ToastController, private authService: GoogleDriveAuthService, private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }
  changeLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
  }
  generatePieChartData() {
    this.pieChartData = [
      { "name": "Dépenses", "value": this.calculateMoney('day', new Date().getDate()) },
      { "name": "Recettes", "value": this.calculateMoney('week', this.getWeekNumber(new Date())) },
      { "name": "Emprunts", "value": this.calculateMoney('month', new Date().getMonth()) },
      { "name": "Prets", "value": this.calculateMoney('year', new Date().getFullYear()) },
      { "name": "Epargnes", "value": this.score },
    ];
  }
  ionViewWillEnter() {
    this.loadOperations();
    this.recalculateWalletScore();
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
    this.calculTotals();
  }

  calculateTotals() {
    this.operationGroups.forEach((operate) => {
      const type = operate.title.toLowerCase();

      if (operate.operations) {
        this.typeTotals[type] = {
          day: this.calculateTotalByPeriod('day', operate),
          week: this.calculateTotalByPeriod('week', operate),
          month: this.calculateTotalByPeriod('month', operate),
          year: this.calculateTotalByPeriod('year', operate),
        };
      }
    });
  }

  calculateTotalByPeriod(period: string, operationGroup: any): number {
    if (operationGroup.operations) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentWeek = this.getWeekNumber(currentDate);
      const currentDay = currentDate.getDate();

      switch (period) {
        case 'day':
          return this.calculateTotalForPeriod(operationGroup.operations, 'day', currentDay);
        case 'week':
          return this.calculateTotalForPeriod(operationGroup.operations, 'week', currentWeek);
        case 'month':
          return this.calculateTotalForPeriod(operationGroup.operations, 'month', currentMonth);
        case 'year':
          return this.calculateTotalForPeriod(operationGroup.operations, 'year', currentYear);
        default:
          return 0;
      }
    }
    return 0;
  }

  calculateTotalForPeriod(operations: any[], period: string, value: number): number {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return operations
      .filter((operation) => this.isInPeriod(operation.timestamp, period, value, currentYear))
      .reduce((sum, operation) => sum + operation.amount, 0);
  }


  calculTotals() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentWeek = this.getWeekNumber(currentDate);
    const currentDay = currentDate.getDate();

    this.operationGroups.forEach((operate) => {
      if (operate.title == "Dépenses") {
        this.dayTotals[0] = this.calculateTotalByPeriod('day', operate);
        this.weekTotals[0] = this.calculateTotalByPeriod('week', operate);
        this.monthTotals[0] = this.calculateTotalByPeriod('month', operate);
        this.yearTotals[0] = this.calculateTotalByPeriod('year', operate);
      } else if (operate.title == "Recettes") {
        this.dayTotals[1] = this.calculateTotalByPeriod('day', operate);
        this.weekTotals[1] = this.calculateTotalByPeriod('week', operate);
        this.monthTotals[1] = this.calculateTotalByPeriod('month', operate);
        this.yearTotals[1] = this.calculateTotalByPeriod('year', operate);
      } else if (operate.title == "Emprunts") {
        this.dayTotals[2] = this.calculateTotalByPeriod('day', operate);
        this.weekTotals[2] = this.calculateTotalByPeriod('week', operate);
        this.monthTotals[2] = this.calculateTotalByPeriod('month', operate);
        this.yearTotals[2] = this.calculateTotalByPeriod('year', operate);
      } else if (operate.title == "Prets") {
        this.dayTotals[3] = this.calculateTotalByPeriod('day', operate);
        this.weekTotals[3] = this.calculateTotalByPeriod('week', operate);
        this.monthTotals[3] = this.calculateTotalByPeriod('month', operate);
        this.yearTotals[3] = this.calculateTotalByPeriod('year', operate);
      } else if (operate.title == "Epargnes") {
        this.dayTotals[4] = this.calculateTotalByPeriod('day', operate);
        this.weekTotals[4] = this.calculateTotalByPeriod('week', operate);
        this.monthTotals[4] = this.calculateTotalByPeriod('month', operate);
        this.yearTotals[4] = this.calculateTotalByPeriod('year', operate);
      }
    });

    for (let index = 0; index < 5; index++) {
      console.log(`${this.operationGroups[index].title} : day= ${this.dayTotals[index]}, week= ${this.weekTotals[index]}, month= ${this.monthTotals[index]}, year= ${this.yearTotals[index]}`);
    }
  }

  calculateMoney(period: string, value: number): number {
    let wallet = 0;

    const currentYear = new Date().getFullYear();

    this.operationGroups.forEach((group) => {
      if (group.title == "Recettes" || group.title == "Emprunts") {
        wallet += group.operations
          .filter((operation) => this.isInPeriod(operation.timestamp, period, value, currentYear))
          .reduce((sum, operation) => sum + operation.amount, 0);
      } else if (group.title == "Dépenses" || group.title == "Prets" || group.title == "Epargnes") {
        wallet -= group.operations
          .filter((operation) => this.isInPeriod(operation.timestamp, period, value, currentYear))
          .reduce((sum, operation) => sum + operation.amount, 0); // Always subtract
      }
    });

    return wallet;
  }




  isInPeriod(timestamp: number, period: string, value: number, year: number): boolean {
    const operationDate = new Date(timestamp);

    switch (period) {
      case 'day':
        return operationDate.getDate() === value && operationDate.getFullYear() === year;
      case 'week':
        return this.getWeekNumber(operationDate) === value && operationDate.getFullYear() === year;
      case 'month':
        return operationDate.getMonth() === value && operationDate.getFullYear() === year;
      case 'year':
        return operationDate.getFullYear() === year;
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


  recalculateWalletScore() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.score = this.calculateMoney('year', currentYear);

  }
  async exportData() {
    const dataToExport = {
      operationGroups: this.operationGroups,
      // Ajoutez d'autres données à exporter au besoin
    };

    const jsonData = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'data_export.json');

    // Utilisation de ToastController pour afficher une notification
    const toast = await this.toastController.create({
      message: 'Données exportées avec succès !',
      duration: 2000, // Durée en millisecondes
      position: 'bottom',
      color: 'success', // Couleur de la notification (peut être personnalisée)
    });

    toast.present();
  }
  async exportDataToGoogleDrive() {
    try {
      await this.exportData();
    } catch (error) {
      console.error('Erreur lors de l\'exportation vers Google Drive :', error);

      const toast = await this.toastController.create({
        message: 'Erreur lors de l\'exportation vers Google Drive',
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });

      toast.present();
    }
  }

  /////////////////////////////////

}

