import { Component } from '@angular/core';

import { Configuracion } from '../configuracion/configuracion.component';
import { HomePage } from '../home/home.component';
import { AlertController, Platform } from 'ionic-angular';
import { WebrtcService } from '../../app/servicios/webrtc.service';
import { LoginService } from '../../app/servicios/login.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Configuracion;

  constructor(private alertCtrl: AlertController, private platform: Platform, private _ws: WebrtcService, private _ls: LoginService) {
    this.atras();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: '¿Está seguro de que desea salir?',
      buttons: [
        {
          text: 'Volver',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Salir',
          handler: () => {
            console.log('Agree clicked');
            this.exitApp();
          }
        }
      ]
    });
    confirm.present();
  }

  exitApp() {
    this.platform.ready().then(() => {
      this._ws.eliminarEmisor();
      this._ls.logout();
      window.close();
    });
  }
  atras() {
    this.platform.registerBackButtonAction((res) => this.showConfirm());
  }

}
