import { Injectable } from '@angular/core';
import {Emisor} from '../intefaces/emisor.interface';
@Injectable()
export class DatosService {

  private emisor:Emisor
  private bloqueado:boolean=true;
  private usuario:string
  constructor() {  }

  setDatos(e:Emisor){
    this.emisor=e;
  }

  getDatos(){
    return this.emisor;
  }

  setBloqueado(){
    this.bloqueado=null;
  }

  getBloqueado(){
    return this.bloqueado;
  }

  getUsuario(){
    return this.usuario;
  }

  setUsuario(s:string){
    this.usuario=s;
  }
}
