import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EpargnePageRoutingModule } from './epargne-routing.module';

import { EpargnePage } from './epargne.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpargnePageRoutingModule
  ],
  declarations: [EpargnePage]
})
export class EpargnePageModule {}
