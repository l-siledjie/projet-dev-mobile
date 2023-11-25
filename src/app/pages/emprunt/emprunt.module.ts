import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpruntPageRoutingModule } from './emprunt-routing.module';

import { EmpruntPage } from './emprunt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpruntPageRoutingModule
  ],
  declarations: [EmpruntPage]
})
export class EmpruntPageModule {}
