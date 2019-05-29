import { Component, ElementRef, HostListener } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessagingService } from './services/messaging.service';

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
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
    setTimeout(() => {
      
    }, 10000);
  }
  logout(){
    this.autorizacionService.logout();
  }
}
