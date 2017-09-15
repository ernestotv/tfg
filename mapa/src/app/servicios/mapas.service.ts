import { Injectable } from '@angular/core';
import {Marcador} from '../interfaces/marcador.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class MapasService {
marcadores:any[]=[];
marcadoresLista:any[]=[];

busqueda:string[]=[];
filtro:any;
prova33:object;
marcador:Marcador;

buscarTitulo:string;
buscarNombre:string;
buscarTema:string;

datos: FirebaseListObservable<any[]>;
  constructor(private db:AngularFireDatabase) {

  }

cargarDatos(){

  this.datos=this.db.list('emisores');
  return this.datos;
}

guardarMarcador(m:Marcador){
  this.marcador=m;
}

getMarcador(){
  return this.marcador;
}

guardarArrayM(m:any){
  this.marcadoresLista=m;
    this.marcadores=m;

}
retornarValor(){
  this.marcadores=this.marcadoresLista;
}

buscar(busqueda:string[]){
//this.filtro=filtro;
this.busqueda=busqueda;
this.retornarValor();
    this.buscarTitulo= this.busqueda[0];
    this.buscarNombre=this.busqueda[1];
    this.buscarTema=this.busqueda[2];
    let mar:any[]=[];

for ( let marca of this.marcadores){
    if( this.buscarTitulo && marca.titulo==this.buscarTitulo){
        mar.push(marca);
      }else if(this.buscarNombre && marca.nombre==this.buscarNombre){
         mar.push(marca);
      }else if(this.buscarTema && marca.tipo==this.buscarTema){
         mar.push(marca);
      }
}
  this.marcadores=mar;
}
}
