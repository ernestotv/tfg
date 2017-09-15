import { Component, OnInit, ElementRef } from '@angular/core';
import { WebrtcService } from '../../servicios/webrtc.service';
import { MapasService } from '../../servicios/mapas.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Marcador } from '../../interfaces/marcador.interface'
@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {
  video: HTMLMediaElement;
  key: string;
  marcador: Marcador;

  constructor(private elRef: ElementRef, private _ws: WebrtcService, private ac: ActivatedRoute,
    private router: Router, private _ms: MapasService) {
    this.ac.params.subscribe(params => {
      this.key = params['id'];
      this.marcador = this._ms.getMarcador();
    })
  }
  ngOnInit() {
    this.cargarVideo();
  }

  cargarVideo() {
    this.video = this.elRef.nativeElement.querySelector('#reproductor');
    this._ws.reproductor(this.video);
    this.cargar();
  }

  cargar() {
    this._ws.crearId();
    this._ws.conectarAlEmisor(this.key);
    this._ws.enviarNumUsu();
    this._ws.cargar();
  }

  volver() {
    this.router.navigate(['home']);
  }
}
