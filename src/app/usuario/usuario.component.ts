import { Component } from '@angular/core';
import{LugaresService}from "../services/lugares.service";
import { AutorizacionService } from '../services/autorizacion.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})

export class UsuarioComponent {
  private title = 'GoGdl';
  private lugares:any;
  private lugaresOcultos:any;
  private loggedUser:any = null;
  private usuarioDB:any;
  private lat:any;
  private lng:any;
  constructor(private afDB: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private lugaresService: LugaresService, private autorizacionService:AutorizacionService) {
    lugaresService
    .getLugares()
    .valueChanges()
    .subscribe(lugares => {
      this.lugares = lugares;
    });

    lugaresService
    .getLugaresOcultos()
    .valueChanges() 
    .subscribe(lugaresO => {
      this.lugaresOcultos = lugaresO;
    });

    this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
    this.autorizacionService.obtenerUsuario()
    .valueChanges().
    subscribe(usuarioDB => {
      this.usuarioDB = usuarioDB;
    });
    navigator.geolocation.getCurrentPosition(this.mostrar);
  }

  public mostrar(pos) {
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.longitude;
  }

  public hacerEmpresario() {
    this.autorizacionService.hacerEmpresario();
  }
}
