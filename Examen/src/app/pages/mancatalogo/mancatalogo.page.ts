import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-mancatalogo',
  templateUrl: './mancatalogo.page.html',
  styleUrls: ['./mancatalogo.page.scss'],
})
export class MancatalogoPage implements OnInit {
  listaimagenes: any;
  listaTallas: any;
  url:string;
  constructor(private serv: ServicioService) { 
    this.listaimagenes = []; this.listaTallas = [];
    this.url=this.serv.URL_API+"imagenes/";
  }
  sliderConfig = {
    initialSlide: 1,
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 0
  };
  ngOnInit() {
   // console.log(this.serv.Id_Producto);
    if (this.serv.Id_Producto>0){
      this.recuperarProductos();
    }else{
      this.serv.irA("/catalogo");
    }
  }
  recuperarProductos(){
    let id=this.serv.Id_Producto;
    this.serv.getProductoImagenes(this.serv.Id_Producto).subscribe(resp=>{
      this.listaimagenes = resp.info.items;
    //  console.log( this.listaimagenes);
     });
     this.serv.getProductoTallas(this.serv.Id_Producto).subscribe(resp=>{
      this.listaTallas = resp.info.items;
    //  console.log( this.listaTallas);
     });
   
  }
  Retornar(){
    this.serv.irA("catalogo");
  }
}
