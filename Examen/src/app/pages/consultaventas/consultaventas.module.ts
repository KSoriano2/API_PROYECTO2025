import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaventasPageRoutingModule } from './consultaventas-routing.module';

import { ConsultaventasPage } from './consultaventas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaventasPageRoutingModule
  ],
  declarations: [ConsultaventasPage]
})
export class ConsultaventasPageModule {}
