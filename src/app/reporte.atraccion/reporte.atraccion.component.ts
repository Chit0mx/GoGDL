import { Component } from "@angular/core";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service';
import {Location} from '@angular/common';
import swal from "sweetalert2";

@Component({
  selector: "app-reporteAtraccion",
  templateUrl: "./reporte.atraccion.component.html"
})
export class ReporteAtraccionComponent {
  private faEnvelope = faEnvelope;
  private email:any;
  private id:any;
  private lugar:any;
  private usuario:any;
  private p:any;
  constructor(private location: Location, private route:ActivatedRoute, private lugaresService:LugaresService, private autorizacionService:AutorizacionService) {
    this.email = "efrainbond@hotmail.com";
    this.id = this.route.snapshot.params['id'];
    this.p = this.route.snapshot.params['p'];
    if (this.p == 0 && this.id == 0){
      swal.fire(
        "No hay atraccion que reportar",
        "Se debe estar en la pagina de una atraccion para reportarla",
        "error"
      );
      this.location.back();
    }
    this.lugaresService.buscarlugar(this.id).
    valueChanges().
    subscribe(lugar => {
      this.lugar = lugar;
    });
    this.autorizacionService.obtenerUsuarioEspecifico(this.p).
    valueChanges().
    subscribe(usuario => {
      this.usuario = usuario;
    });
  }
}
