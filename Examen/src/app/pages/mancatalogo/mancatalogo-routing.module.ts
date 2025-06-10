import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MancatalogoPage } from './mancatalogo.page';

const routes: Routes = [
  {
    path: '',
    component: MancatalogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MancatalogoPageRoutingModule {}
