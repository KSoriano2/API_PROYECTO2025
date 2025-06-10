import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//mis importaciones
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  URL_API: string = 'http://localhost:81/APIEXAMENP2/';
  Id_Producto: any;
  constructor(private http: HttpClient, private route: Router, private toast: ToastController,) { }


  //login
  fun_login(__usuario: string, __clave: string) {
    let URL = this.URL_API + "login";
    return this.http.post<any>(URL, this.objectToFormData({
      usuario: __usuario,
      clave: __clave
    }));
  }
  
  getMenuOpt(id) {
    let URL = this.URL_API + "menu/" + id;
    return this.http.get<any>(URL);
  }

  irA(pagina: string) {
    this.route.navigate([pagina]);
  }

  getProductos() {
    let URL = this.URL_API + "listarProductos";
    return this.http.get<any>(URL);
  }
  getProductoImagenes(id) {
      let URL = this.URL_API + "ProductoImagenes/" + id;
      return this.http.get<any>(URL);
  }
  getProductoTallas(id) {
    let URL = this.URL_API + "ProductoTallas/" + id;
    return this.http.get<any>(URL);
  }

  //funciòn para armar el body
  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }

      }
    }
    return fd;
  };

  async Mensaje(texto: string, micolor: string = "success") {
    let t = await this.toast.create({
      message: texto,
      color: micolor,
      duration: 3000
    });
    t.present();

  }
}
