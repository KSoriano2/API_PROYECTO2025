import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaventasPage } from './consultaventas.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaventasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaventasPageRoutingModule {}
