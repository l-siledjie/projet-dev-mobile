import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpargnePage } from './epargne.page';

const routes: Routes = [
  {
    path: '',
    component: EpargnePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpargnePageRoutingModule {}
