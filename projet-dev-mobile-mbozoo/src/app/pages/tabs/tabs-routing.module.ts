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
        path: 'statistics',
        loadChildren: () =>
          import('../statistics/statistics.module').then(
            (m) => m.StatisticsPageModule
          ),
      },

      { path: '', redirectTo: '/tabs/acceuil', pathMatch: 'full' },
    ],
  },
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TabsPageRoutingModule {};
