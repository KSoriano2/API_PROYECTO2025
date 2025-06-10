import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroempleadosPageRoutingModule } from './registroempleados-routing.module';

import { RegistroempleadosPage } from './registroempleados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroempleadosPageRoutingModule
  ],
  declarations: [RegistroempleadosPage]
})
export class RegistroempleadosPageModule {}
