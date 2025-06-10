
import { Component, OnInit } from '@angular/core';
import { IonMenu } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicio.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  listaOptMenus:any[];
  constructor(private serv:ServicioService) { }

  ngOnInit() {
    this.recuperarListaMenu();
  }
  recuperarListaMenu(){
   this.serv.getMenuOpt(localStorage.getItem('Per_Id')).subscribe(resp=>{
    this.listaOptMenus = resp.info.items;
   // console.log( this.listaOptMenus);
   });
  }
  ir(direccion){
   // console.log(direccion);
    this.serv.irA(direccion);
  }
}
