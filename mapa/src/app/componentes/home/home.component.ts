import { Component, OnInit, ElementRef } from '@angular/core';
import { MapasService } from '../../servicios/mapas.service';
import { Marcador } from '../../interfaces/marcador.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { WebrtcService } from '../../servicios/webrtc.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lat: number = 39.467199;
  lng: number = -0.374910;
  zoom: number = 6;
  prova: string[] = [];
  marcadores: Marcador[] = [];
  titulo: string;
  constructor(public _ms: MapasService, private elRef: ElementRef, private _ws: WebrtcService, private router: Router) {
    this._ms.cargarDatos().subscribe((datos) => {
      let marcadores = datos as Marcador[];
      this._ms.guardarArrayM(marcadores);
    });
  }

  ngOnInit() {
  }

  clickMarcador(marcador: Marcador) {
    this._ms.guardarMarcador(marcador);
    this.router.navigate(['reproductor', marcador.key]);
  }

}
