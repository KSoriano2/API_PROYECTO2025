import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  productos: any[] = [];
  url: string = "";
  constructor(private serv: ServicioService,
    private loading: LoadingController,
    private alert: AlertController) {
    this.url = this.serv.URL_API + "imagenes/";
  }

  ngOnInit() {
    this.listar();
  }
  ionViewWillEnter() {
    this.listar();
  }
  async listar() {
    let load = await this.loading.create();
    load.present();
    this.serv.getProductos().subscribe(resp => {
      if (resp.total > 0) {
        this.productos = resp.info.items;
        //console.log(this.productos);
      } else {
        this.productos = [];
      }
      load.dismiss();
    });
  }


  detalle(item) {
    this.serv.Id_Producto = item.PRO_ID;
    this.serv.irA('mancatalogo');
  }

  Retornar(){
    this.serv.irA("principal");
  }

}
