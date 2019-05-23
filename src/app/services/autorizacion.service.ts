import { Injectable, DebugElement } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Injectable()
export class AutorizacionService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private router: Router
  ) {
    this.isLogged();
  }
  public login = (email, password) => {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        swal.fire("Iniciaste sesión!", "", "success");
        console.log(response);
        this.router.navigate(["inicio"]);
      })
      .catch(error => {
        swal.fire("Oops..", "Ocurrio un error al iniciar sesion", "error");
        console.log(error);
      });
  };
  forgot(email: string): any {
    swal.fire(
      "Restableciste tu contraseña",
      "Por favor ve a tu bandeja de entrada y sigue los pasos indicados en el correo",
      "success"
    );
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }
  cambiarC
  public registro = (email, password, nombre, apellido) => {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        swal.fire("Creaste una cuenta!", "Hora de explorar GoGDL", "success");
        console.log(response);
        const $id = this.angularFireAuth.auth.currentUser.uid;
        this.afDB.database
          .ref("/users")
          .child($id)
          .set({
            Nombre: nombre,
            Apellido: apellido,
            Email: email,
            Empresario: false
          });
        this.router.navigate(["inicio"]);
        this.send_verification();
      })
      .catch(error => {
        console.log(error);
      })
      .catch(error => {
        swal.fire("Error", "No se pudo crear la cuenta", "warning");
        console.log(error);
      });
  };
  public send_verification() {
    var user = this.angularFireAuth.auth.currentUser;
    user
      .sendEmailVerification()
      .then(function() {
        swal.fire(
          "Se envio un correo de verificacion",
          "Revisa tu bandeja de entrada y sigue los pasos del correo recibido",
          "success"
        );
      })
      .catch(function(error) {
        swal.fire("Error", "No se enviar el correo de verificacion", "error");
      });
  }
  public bajaUsuario(){
    var user = this.angularFireAuth.auth.currentUser;
    user.delete().then(function(){
      swal.fire(
        "Se ha eliminado tu cuenta",
        "Ojalá regreses a GoGDL pronto",
        "warning"
      );
    }).catch(function(error){
      swal.fire("Error", "No se pudo eliminar tu cuenta , intentalo más tarde", "error");
    })
  }
  public obtenerUsuario() {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    return this.afDB.object("users/" + $id);
  }

  public obtenerUsuarioEspecifico(id) {
    return this.afDB.object("users/" + id);
  }

  public isLogged() {
    return this.angularFireAuth.authState;
  }
  public logout() {
    this.angularFireAuth.auth.signOut();
    swal.fire("Cerraste sesión", "", "warning");
    this.router.navigate(["inicio"]);
  }
  public getUser() {
    return this.angularFireAuth.auth;
  }

  public hacerEmpresario() {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id);
    usuario.update({
      Empresario: true
    });
    swal.fire("Felicidades!", "Ahora eres empresario", "success");
    this.router.navigate(["/crear/new"]);
  }

  public agregarFavorito(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    usuario.update({
      favorito: true
    });
    this.router.navigate(["/detalle/" + idA]);
  }

  public quitarFavorito(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    usuario.update({
      favorito: false
    });
    this.router.navigate(["/detalle/" + idA]);
  }

  public obtenerLugarUsr(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    return this.afDB.object("/users/" + $id + "/" + idA);
  }

  public agregarEstoyAqui(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    if (this.afDB.object("/users/" + $id + "/" + idA))
      usuario.update({
        Visite: true
      });
    this.router.navigate(["/detalle/" + idA]);
  }

  public quitarEstoyAqui(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    if (this.afDB.object("/users/" + $id + "/" + idA))
      usuario.update({
        Visite: false
      });
    this.router.navigate(["/detalle/" + idA]);
  }

  public hacerResenia(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    usuario.update({
      reseniado: true
    });
    this.router.navigate(["/detalle/" + idA]);
  }

  public rehacerResenia(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    usuario.update({
      reseniado: false
    });
    this.router.navigate(["/detalle/" + idA]);
  }

  public calificado(idA, n) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    usuario.update({
      calificado: true,
      calificacion: n
    });
    this.router.navigate(["/detalle/" + idA]);
  }

  public noCalificado(idA) {
    const $id = this.angularFireAuth.auth.currentUser.uid;
    let usuario = this.afDB.object("/users/" + $id + "/" + idA);
    usuario.update({
      calificado: false,
      calificacion: 0
    });
    this.router.navigate(["/detalle/" + idA]);
  }
}
