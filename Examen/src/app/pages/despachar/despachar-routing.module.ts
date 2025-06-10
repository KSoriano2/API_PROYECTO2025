import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespacharPage } from './despachar.page';

const routes: Routes = [
  {
    path: '',
    component: DespacharPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespacharPageRoutingModule {}
