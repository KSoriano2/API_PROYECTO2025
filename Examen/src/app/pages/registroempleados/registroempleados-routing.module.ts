import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroempleadosPage } from './registroempleados.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroempleadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroempleadosPageRoutingModule {}
