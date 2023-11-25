import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'save',
        loadChildren: () =>
          import('../save/save.module').then((m) => m.SavePageModule),
      },
      {
        path: 'epargne',
        loadChildren: () =>
          import('../epargne/epargne.module').then((m) => m.EpargnePageModule),
      },
      {
        path: 'emprunt',
        loadChildren: () =>
          import('../emprunt/emprunt.module').then((m) => m.EmpruntPageModule),
      },
      { path: '', redirectTo: '/tabs/acceuil', pathMatch: 'full' },
    ],
  },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TabsPageRoutingModule {};
