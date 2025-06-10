import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroclientePage } from './registrocliente.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroclientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroclientePageRoutingModule {}
