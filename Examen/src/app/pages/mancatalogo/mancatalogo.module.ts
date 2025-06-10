import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MancatalogoPageRoutingModule } from './mancatalogo-routing.module';

import { MancatalogoPage } from './mancatalogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MancatalogoPageRoutingModule
  ],
  declarations: [MancatalogoPage]
})
export class MancatalogoPageModule {}
