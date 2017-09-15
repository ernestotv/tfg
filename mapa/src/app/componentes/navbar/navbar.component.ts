import { Component, OnInit } from '@angular/core';
import { MapasService } from '../../servicios/mapas.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  defaultValue = "Todos"
  nombreVideo: string;
  usuario: string;
  tematica: string;
  filtroBusqueda: string[] = [];
  constructor(private _ms: MapasService, private router: Router) {
    this.tematica = "5";
  }

  ngOnInit() {
  }

  buscar() {
    if (this.nombreVideo || this.usuario || this.tematica != "5") {
      this.filtroBusqueda = [this.nombreVideo, this.usuario, this.tematica];
      this._ms.buscar(this.filtroBusqueda);
    } else {
      this._ms.retornarValor();
    }
    this.nombreVideo = "";
    this.usuario = "";
    this.tematica = "5";
  }
}
