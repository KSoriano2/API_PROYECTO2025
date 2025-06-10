import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usu_usuario:string;
  usu_password:string;
  titulo:string;
  constructor(private serv:ServicioService,
    private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  login(){
    this.serv.fun_login(this.usu_usuario,this.usu_password)
    .subscribe(res=>{
      //console.log(JSON.stringify(res));
      if(res.id>0){
        localStorage.setItem('Per_Id', res.info.items.PER_ID);
        localStorage.setItem('Usr_id', res.info.items.USR_ID);
        localStorage.setItem('Usr_nombres', res.info.items.USR_NOMBRES);
      
        this.serv.irA("/principal");
      }else{
        this.serv.Mensaje("Usuario o Clave incorrecta","warning")
        this.limpiar();
      }
      this.usu_usuario="";
      this.usu_password="";

    })
  }


  limpiar(){
    this.usu_usuario="";
    this.usu_password="";
    this.titulo="";
    localStorage.setItem('Per_Id', "");
    localStorage.setItem('Usr_id', "");
    localStorage.setItem('Usr_nombres', "");
  }
  

  

 

  
}
