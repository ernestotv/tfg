import { Component, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { WebrtcService } from '../../app/servicios/webrtc.service';
import { Emisor, DatosService } from "../../app/intefaces/index";
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { Configuracion } from '../configuracion/configuracion.component';
@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomePage {

  yourVideo: HTMLMediaElement;
  localStream: MediaStream;
  miId: any;
  lat = 0;
  long = 0;
  iniciar = true;
  bloqueado: boolean;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, private elRef: ElementRef,
    public _ws: WebrtcService, public geolocation: Geolocation, private alertCtrl: AlertController,
    private _dt: DatosService) {
    this.bloqueado = this._dt.getBloqueado();
  }

  obtenerPosicion = (): any => {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(response => {
      this.lat = response.coords.latitude;
      this.long = response.coords.longitude;
      this.actualizarCoordenadas();
    })
      .catch(error => {
        console.log("No se puede obtener la posición " + error);
      })
  }


  actualizarCoordenadas = () => {
    let e: Emisor = this._dt.getDatos();
    e.latitud = this.lat;
    e.longitud = this.long;
    this._dt.setDatos(e);
  }

  presentConfirm() {
    this.obtenerPosicion();
    let alert = this.alertCtrl.create({
      title: '¿Está seguro que desea iniciar la emisión?',
      buttons: [
        {
          text: 'Volver',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.showMyFace();
          }
        }
      ]
    });
    alert.present();
  }

  pararRetransmision() {
    this.localStream.getAudioTracks()[0].stop();
    this.localStream.getVideoTracks()[0].stop();
    this.iniciar = true;
  }

  irAconfiguracion() {
    this.navCtrl.push(Configuracion);
  }

  showMyFace() {

    this._ws.showMyFace().then(stream => {
      this.iniciar = null;
      this.yourVideo = this.elRef.nativeElement.querySelector('#yourVideo');
      this.yourVideo.srcObject = stream;
      this.localStream = stream;
      this._ws.guardarDatos(this._dt.getDatos());
      this._ws.guardarStream(this.localStream);
    }).catch(error => {
      console.log("error " + error.name + " ->" + error.message);
    });
  }

}
