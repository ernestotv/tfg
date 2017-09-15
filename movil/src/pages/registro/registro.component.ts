import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home.component';
import { LoginService } from '../../app/servicios/login.service';
import { TabsPage } from '../tabs/tabs';
import { Emisor, DatosService } from "../../app/intefaces/index";

@Component({

  selector: 'app-registro',
  templateUrl: 'registro.component.html'
})

export class RegistroComponent implements OnInit {
  rootPage: any = 'RegistroComponent';
  user: string = "";
  pass: string;
  isLog: boolean;

  constructor(private navCtrl: NavController, private _ls: LoginService, private alertCtrl: AlertController,
    private _dt: DatosService) { }

  ngOnInit() { }


  alerts(tipo: string) {
    let texto: string = "";
    switch (tipo) {
      case "auth/weak-password": {
        texto = "La contraseña debe tener al menos 6 caracteres";
        break;
      } case "auth/invalid-email": {
        texto = "El campo correo no es correcto";
        break;
      } case "auth/user-not-found": {
        texto = "La dirección de correo " + this.user + " no está registrada ";
        break;
      } case "auth/email-already-in-use": {
        texto = "La dirección de correo " + this.user + " ya está registrada ";
        break;
      } case "auth/wrong-password": {
        texto = "Contraseña incorrecta";
        break;
      } case "faltaCampos": {
        texto = "Debe introducir todos los campos";
        break;
      } case "registro": {
        texto = "Registro completado, mira tu correo";
        break;
      } case "cotraRes": {
        texto = "Contraseña restablecida, mira tu correo";
        break;
      } case "contraNores": {
        texto = "No se puede restablecer la contraseña ";
        break;
      } case "correoNoVerificado": {
        texto = "Para poder entrar en la aplicación debe verificar el correo";
        break;
      } default: {
        texto = "Ha ocurrido un error inesperado.";
      }
    }
    this.alertsInfo(texto);
  }
  alertsInfo(texto: string) {
    let alert = this.alertCtrl.create({
      title: texto,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  camposNoNulos = () => {
    if (this.user && this.pass)
      return true;
    else {
      this.alerts("faltaCampos");
      return false;
    }
  }

  loginCo = (email: string, pass: string) => {
    let correoVer;
    if (this.camposNoNulos()) {
      this._ls.loginCorreo(email.trim(), pass).then(res => {
        let er = JSON.stringify(res);
        er = JSON.parse(er);
        let nombreUsuario = email.substring(0, email.indexOf('@'));
        this._dt.setUsuario(nombreUsuario);
        correoVer = this._ls.correoVerificado(email);
        if (correoVer)
          this.navCtrl.setRoot(TabsPage).then();
        else if (!correoVer) {
          this.alerts("correoNoVerificado");
        }

      }).catch((error) => {
        // Handle Errors here.
        let er: any;
        er = JSON.stringify(error);
        er = JSON.parse(er);
        this.alerts(er.code);
        let errorName = error.name;
        let errorMessage = error.message;
        console.log(errorName + ":" + errorMessage);
      });
    }

  }

  crearLog = (email: string, pass: string) => {
    if (this.camposNoNulos()) {
      this._ls.crearLogin(email.trim(), pass).then(res => {
        this._ls.enviarCorreo(email.trim()).then(() => {//()=> {}
          this.alerts("registro");
        });
      }).catch(error => {
        let er: any;
        er = JSON.stringify(error);
        er = JSON.parse(er);
        this.alerts(er.code);
        let errorName = error.name;
        let errorMessage = error.message;
        console.log(errorName + ":" + errorMessage);
      });
    }
  }

  restablecer = (email) => {
    if (email.trim()) {
      this._ls.restablecerContra(email.trim()).then(res => {
        this.alerts("cotraRes")
      }).catch(error => {
        this.alerts("contraNores");
      });
    }

  }

}
