import {Injectable} from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable()
export class AutorizacionService {
  constructor(private angularFireAuth: AngularFireAuth, private afDB: AngularFireDatabase, private router:Router) {
    this.isLogged();
  };
  public login = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      alert('Usuario ingresado con exito');
      console.log(response);
      this.router.navigate(['inicio']);
    })
    .catch((error) => {
      alert('Ah ocurrido un error');
      console.log(error);
    })
  };
  public registro = (email, password, nombre, apellido) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        alert('Usuario registrado con exito');
        console.log(response);
        const $id = this.angularFireAuth.auth.currentUser.uid;
        this.afDB.database.ref('/users').child($id).set({
          Nombre: nombre,
          Apellido: apellido
        });
        this.router.navigate(['inicio']);
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        alert('Ah ocurrido un error');
        console.log(error);
      })
  }
  public obtenerUsuario() {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    return this.afDB.object("users/" + $id);
  }
  public isLogged() {
    return this.angularFireAuth.authState;
  };
  public logout() {
    this.angularFireAuth.auth.signOut();
    alert("Sesión Cerrada");
    this.router.navigate(['inicio']);
  }
  public getUser() {
    return this.angularFireAuth.auth;
  }
}
