import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespacharPageRoutingModule } from './despachar-routing.module';

import { DespacharPage } from './despachar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespacharPageRoutingModule
  ],
  declarations: [DespacharPage]
})
export class DespacharPageModule {}
