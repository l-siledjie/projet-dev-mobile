import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpruntPage } from './emprunt.page';

const routes: Routes = [
  {
    path: '',
    component: EmpruntPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpruntPageRoutingModule {}
