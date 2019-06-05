import { Component, ElementRef, HostListener } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessagingService } from './services/messaging.service';
import { LugaresService } from './services/lugares.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn = false;
  loggedUser:any = null;
  usuarioDB:any = {};
  message;
  mostrarNotificacion:Boolean = false;
  constructor(private autorizacionService:AutorizacionService, 
    private afDB: AngularFireDatabase,
    private lugaresService: LugaresService,
    public msgService: MessagingService){
    this.autorizacionService.isLogged()
    .subscribe((result) => {
      if(result && result.uid){
        this.loggedIn = true;
        setTimeout(() => {
          this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
          this.autorizacionService.obtenerUsuario()
          .valueChanges().
          subscribe(usuarioDB => {
            this.usuarioDB = usuarioDB;
          });
        }, 500);
      } else {
        this.loggedIn = false;
      }
    }, (error) => {
      this.loggedIn = false;
    })
    this.revisarEstadoUsuarios();
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  logout(){
    this.autorizacionService.logout();
    swal.fire("Cerraste sesión", "", "warning");
  }

  public revisarEstadoUsuarios() {
    let hoy = new Date();
    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    console.log(mes);
    if (dia == 28) {
      this.autorizacionService.mailEstadistica();
    } else if (dia == 1) {
      if (mes == 6) {
        this.autorizacionService.hacerUsuariosInactivos();
      } else if (mes == 7) {
        this.lugaresService.ocultarAtraccionesUsuariosInactivos();
      } 
    }
    
  }
}
