import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from '../pages/login/login-routing.module';




@NgModule({
  declarations: [MenuComponent],
  exports:[MenuComponent],
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule

  ]
})
export class ComponentesModule { }
