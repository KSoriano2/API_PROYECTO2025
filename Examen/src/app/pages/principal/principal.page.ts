import { Component, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  Usr_id:number;
  Usr_nombres:string;
  Per_Id:string;

  constructor(private serv:ServicioService) { }

  ngOnInit() {
   
    this.Per_Id=localStorage.getItem('Per_Id');
    this.Usr_id=parseInt(localStorage.getItem('Usr_id'));
    this.Usr_nombres=localStorage.getItem('Usr_nombres');
    

  }

  salir(){
    localStorage.setItem('Per_Id',null);
    localStorage.setItem('Usr_id', null);
    localStorage.setItem('Usr_nombres', null);
    this.serv.irA("/login") 
  }

  


}
