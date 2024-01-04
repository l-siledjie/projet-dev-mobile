import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OperationService } from 'src/app/services/operation.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  selectedType: string;
  operationLabel: string;
  amount: number;

  constructor(private modalController: ModalController, private operationService: OperationService) {}

  showGrid = false;
  is_open: boolean = false;

  openForm() {
    this.is_open = true;
  }

  handleClose(event: any) {
    this.is_open = false;
  }

  onClose() {
    this.is_open = false;
    // Dismiss the modal using the modal controller
    this.modalController.dismiss();
  }

  saveOperation() {
    this.operationService.addOperation(this.selectedType, this.operationLabel, this.amount);
    this.onClose();
  }

  ngOnInit() {}
}
