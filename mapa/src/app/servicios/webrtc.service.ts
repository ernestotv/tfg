import { Injectable } from '@angular/core';
import { MapasService } from './mapas.service';
import { Component, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class WebrtcService {
  database: any;

  localStream: MediaStream;
  yourVideo: HTMLMediaElement;
  friendsVideo: HTMLMediaElement;
  miId: any;
  servers: any;
  private pc: RTCPeerConnection; //RTCPeerConnection
  chats: FirebaseListObservable<any[]>;
  ins: FirebaseListObservable<any[]>;
  ref: any;
  ref2: any;
  clave: any;
  id2: any;


  constructor(private db: AngularFireDatabase, private _ms: MapasService) {

  }

  crearId = () => {
    this.miId = Math.floor(Math.random() * 1000000000);
  }

  cargar = () => {
    this.servers = {
      'iceServers': [{ 'urls': 'stun:stun.services.mozilla.com' }, { 'urls': 'stun:stun.l.google.com:19302' },
      { 'urls': 'turn:numb.viagenie.ca', 'credential': 'emiliojose', 'username': 'tfg.ernesto@gmail.com' }
      ]
    };
    this.pc = new RTCPeerConnection(this.servers);// new RTCPeerConnection(this.servers);
    this.onicecandidate();
    this.ontrack();
  }

  onicecandidate() {
    this.pc.onicecandidate =
      (event => {
        event.candidate ?
        this.sendMessage(this.miId, JSON.stringify({ 'ice': event.candidate }))
        : console.log("Sent Ice")
      });
  }

  reproductor = (video) => {
    this.friendsVideo = video;
  }

  ontrack = () => {
    this.pc.onaddstream = (event) => {
      this.friendsVideo.srcObject = event.stream;
    };
  }

  conectarAlEmisor = (clave) => {
    this.clave = clave;
  }

  enviarNumUsu = () => {
    this.ins = this.db.list('emisores');
    this.chats = this.db.list("chats/" + this.miId);
    this.ref = this.db.database.ref('chats/' + this.miId);
    this.ref.on('child_added', this.readMessage);
    this.ins.update(`${this.clave}`, { usuarios: this.miId });
    //msg.remove();
  }

  sendMessage(senderId, data) {
    let msg = this.chats.push({ id: senderId, message: data });
    //  msg.remove();
  }

  readMessage = (data) => {
    let mensaje = JSON.parse(data.val().message);
    let sender = data.val().id;

    if (sender != this.miId) {
      if (mensaje.ice != undefined) {
        this.pc.addIceCandidate(new RTCIceCandidate(mensaje.ice));
      }
      else if (mensaje.sdp.type == "offer") {
        this.pc.setRemoteDescription(new RTCSessionDescription(mensaje.sdp))
          .then(() => this.pc.createAnswer())
          .then(answer => {
            this.pc.setLocalDescription(answer);
          })
          .then(() => {this.sendMessage(this.miId, JSON.stringify({ 'sdp': this.pc.localDescription })) });
      }
      else if (mensaje.sdp.type == "answer") {
        this.pc.setRemoteDescription(new RTCSessionDescription(mensaje.sdp));
      }
    }
  }
}
