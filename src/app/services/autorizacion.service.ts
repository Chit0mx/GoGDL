import {Injectable} from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AutorizacionService {
  constructor(private angularFireAuth: AngularFireAuth, private afDB: AngularFireDatabase) {
    this.isLogged();
  }
  public login = (email, password) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((response) => {
      alert('Usuario ingresado con exito');
      console.log(response);
    })
    .catch((error) => {
      alert('Ah ocurrido un error');
      console.log(error);
    })
  }
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
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        alert('Ah ocurrido un error');
        console.log(error);
      })
  }
  public isLogged() {
    return this.angularFireAuth.authState;
  }
}
