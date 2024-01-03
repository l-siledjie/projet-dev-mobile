import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-introduction',
  templateUrl: 'introduction.page.html',
  styleUrls: ['introduction.page.scss'],
})
export class IntroductionPage {
  constructor(private navCtrl: NavController) {}

  ionViewDidEnter() {
    // Naviguer vers la page principale après 5 secondes
    setTimeout(() => {
      this.navigateToMainPage();
    }, 5000);
  }

  navigateToMainPage() {
    this.navCtrl.navigateRoot('/landing'); // Remplacez '/main' par le chemin de votre page principale
  }
}
