import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Injectable()
export class LoginService {
  user: string = "";
  password: string = "";

  constructor(public afAuth: AngularFireAuth) {
    //console.log("LoginService");
  }

  loginCorreo(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  crearLogin(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  enviarCorreo(email: string) {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  correoVerificado(em: string) {

    if (this.afAuth.auth.currentUser.emailVerified) {
      return true;
    }
    return false;
  }

  restablecerContra(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }


}
