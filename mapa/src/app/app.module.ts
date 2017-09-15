import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
//maps
import { AgmCoreModule } from '@agm/core';

//servicios
import {MapasService} from './servicios/mapas.service';
import {WebrtcService} from './servicios/webrtc.service';

//components
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ReproductorComponent } from './componentes/reproductor/reproductor.component';
import { HomeComponent } from './componentes/home/home.component';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//rutas
import {APP_ROUTING} from './app.routes';
import { FooterComponent } from './componentes/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReproductorComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCEFnbpH7-qPkT6dL54OCFu9J1sD075mkQ '
      }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    APP_ROUTING
  ],
  providers: [MapasService,WebrtcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
