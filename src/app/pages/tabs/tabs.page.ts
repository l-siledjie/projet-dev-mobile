import { Component, OnInit, ViewChildren } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {


  constructor( private modalController: ModalController  ) { }
  @ViewChildren(IonModal) modal!:IonModal
  showGrid = false;
  is_open: boolean = false;
  openForm() {
    this.is_open = true;
  }
  handleClose(even:any){
    this.is_open = false;
  }
  onClose() {
    this.is_open = false;
    this.modal.dismiss();  
  }

   
  ngOnInit() {
  }

}
