import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Emisor, DatosService } from "../../app/intefaces/index";

@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.component.html'
})
export class Configuracion {
  tipos: string[];
  nombreUsuario: string = this._dt.getUsuario();
  titulo: string = "";
  descripcion: string = "";
  tipo: string = "";
  emi: Emisor;

  constructor(public navCtrl: NavController, private _dt: DatosService, private alertCtrl: AlertController) {

    this.tipos = ["Espectáculos",
      "Música",
      "Deportes",
      "Noticias",
      "Otros"];
    this.tipo = "1";
  }

  alertGuardar() {
    let alert = this.alertCtrl.create({
      title: 'Debe introducir los campos "Nombre de usuario" y "Título del video" ',
      buttons: ['Aceptar']
    });
    alert.present();
  }

  agregar() {
    if (this.nombreUsuario.length == 0 || this.titulo.length == 0) {
      this.alertGuardar()
      return;
    } else {
      let id = Math.floor(Math.random() * 1000000000);
      this.emi = {
        nombre: this.nombreUsuario,
        titulo: this.titulo,
        tipo: this.tipo,
        description: this.descripcion,
        latitud: 0,
        longitud: 0,
        id: id.toString(),
        key: "",
        usuarios: "0",
        mostrar: true
      }
      this._dt.setUsuario(this.nombreUsuario);
      this._dt.setDatos(this.emi);
      this._dt.setBloqueado();
      this.navCtrl.parent.select(0);
    }
  }
}
