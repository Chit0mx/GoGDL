import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{LugaresService}from "../services/lugares.service";
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent {
  id=null;
  lugar:any={};
  nombre = null;
  profileUrl: Observable<string | null>;
  precio:any;
  editar = false;
  loggedUser:any = null;
  usuarioDB:any = {};
  constructor (private autorizacionService:AutorizacionService, private storage: AngularFireStorage, private route:ActivatedRoute, private lugaresService:LugaresService){
    this.id = this.route.snapshot.params['id'];
    this.lugaresService.buscarlugar(this.id).
    valueChanges().
    subscribe(lugar => {
      this.lugar = lugar;
    });
    const ref = this.storage.ref('atracciones/' + this.id);
    this.profileUrl = ref.getDownloadURL();

    setTimeout(() => {
      this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
    }, 500)
  }
}
