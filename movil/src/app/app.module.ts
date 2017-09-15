import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpModule } from '@angular/http';

import { Configuracion } from '../pages/configuracion/configuracion.component';
import { HomePage } from '../pages/home/home.component';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//registro usuarios
import { RegistroComponent } from '../pages/registro/registro.component';

//servicios
import { LoginService } from './servicios/login.service';
import { WebrtcService } from './servicios/webrtc.service';
import { DatosService } from './servicios/datos.service';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Geolocalización
import { Geolocation } from '@ionic-native/geolocation';

// Congiguración firebase
export const environment = {
  firebase: {
    apiKey: "AIzaSyAhqWM96BUbLD6_sKHJw0GiAut3Oep_BpY",
    authDomain: "webrtc-ccdfe.firebaseapp.com",
    databaseURL: "https://webrtc-ccdfe.firebaseio.com",
    projectId: "webrtc-ccdfe",
    storageBucket: "webrtc-ccdfe.appspot.com",
    messagingSenderId: "1098034135287"
  }
};

@NgModule({
  declarations: [
    MyApp,
    Configuracion,
    HomePage,
    TabsPage,
    RegistroComponent

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Configuracion,
    HomePage,
    TabsPage,
    RegistroComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginService,
    WebrtcService,
    DatosService,
    Geolocation
  ]
})
export class AppModule { }
