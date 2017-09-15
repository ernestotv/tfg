import { Injectable } from '@angular/core';
import { Component, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Emisor, DatosService } from "../intefaces/index";

/*
  Generated class for the ServiciosWebrtcServiceTsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebrtcService {

  localStream: MediaStream;
  yourVideo: any;
  friendsVideo: HTMLMediaElement;
  private miId: any;
  servers: any;
  private pc: webkitRTCPeerConnection; //RTCPeerConnection
  chats: FirebaseListObservable<any[]>;
  insertar: FirebaseListObservable<any[]>;

  ref: any;
  ref2: any;
  private opciones: string = "";
  dis: any;
  mensa: any;


  constructor(private db: AngularFireDatabase, private _ds: DatosService) {
    this.insertar = this.db.list("emisores");
  }

  guardarDatos = (emi: Emisor) => {
    this.miId = emi.id;
    this.mensa = this.insertar.push(emi);
    emi.key = this.mensa.key;
    this._ds.setDatos(emi);
    this.insertar.update(emi.key, emi);
    this.mensa.on('child_changed', this.leerUsuarios);

  }

  setId = (miId) => {
    this.miId = miId;
  }

  getId = () => {
    this.miId;
  }


  cargar = () => {
    this.servers = {
      'iceServers': [{ 'urls': 'stun:stun.services.mozilla.com' }, { 'urls': 'stun:stun.l.google.com:19302' }
        , { 'urls': 'turn:numb.viagenie.ca', 'credential': 'emiliojose', 'username': 'tfg.ernesto@gmail.com' }
      ]
    };
    this.pc = new webkitRTCPeerConnection(this.servers);//new RTCPeerConnection(this.servers);
    this.onicecandidate();
    this.ontrack();
    //  this.showFriendsFace();
  }



  onicecandidate() {
    this.pc.onicecandidate =
      (event => {
        event.candidate ?
        this.sendMessage(this.miId, JSON.stringify({ 'ice': event.candidate }))
        : console.log("Sent Ice")
      });
  }

  ontrack() {
    this.pc.onaddstream = (event => {
      this.chats.remove();
      return event.stream;
    });
  }

  sendMessage(senderId, data) {
    let msg = this.chats.push({ id: senderId, message: data });
  }

  leerUsuarios = ((datos) => {
    let id2 = JSON.stringify(datos);
    this.chats = this.db.list("chats/" + id2); // carga la lista de los observables
    this.ref = this.db.database.ref('chats/' + id2); //referencia bd
    this.ref.on('child_added', this.readMessage);
    this.cargar();
    this.addStream(this.localStream);
    this.showFriendsFace();
  });

  readMessage = ((data) => {
    let mensaje = JSON.parse(data.val().message);
    let id = data.val().id;
    if (id != this.miId) {
      if (mensaje.ice != undefined) {
        this.pc.addIceCandidate(new RTCIceCandidate(mensaje.ice));
      }
      else if (mensaje.sdp.type == "offer") {
        this.pc.setRemoteDescription(new RTCSessionDescription(mensaje.sdp))
          .then(() => this.pc.createAnswer())
          .then(answer => { this.pc.setLocalDescription(answer); })
          .then(() => this.sendMessage(this.miId, JSON.stringify({ 'sdp': this.pc.localDescription })));
      }
      else if (mensaje.sdp.type == "answer") {
        this.pc.setRemoteDescription(new RTCSessionDescription(mensaje.sdp));
      }
    } else {
      console.log("Son distintos");
    }
  });

  tipoCamara = () => {
    let cont = 0;
    navigator.mediaDevices.enumerateDevices()
      .then(function(devices) {
        devices.forEach(function(device) {
          if (device.kind == 'videoinput') {
            //this.opciones.push(device.label+" Camara ");
            this.dis = device.deviceId;
            this.cont++;
          }
        });
      })
      .catch(function(err) {
        console.log("Error en los dispositivos " + err.name + ": " + err.message);
      });
  }

  showMyFace() {
    this.tipoCamara();
    return navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  }

  addStream = (stream: MediaStream) => {
    this.localStream = stream;
    this.pc.addStream(stream)
  }

  guardarStream(stream: MediaStream) {
    this.localStream = stream;
  }

  /*enviarOferta(){
    this.showFriendsFace();
  }*/

  showFriendsFace = () => {
    this.pc.createOffer()
      .then(offer => { this.pc.setLocalDescription(offer); })
      .then(() => this.sendMessage(this.miId, JSON.stringify({ 'sdp': this.pc.localDescription })));
  }

  eliminarEmisor() {
    if (this.mensa) {
      this.insertar.remove(this.mensa.key);
    }
  }
}
