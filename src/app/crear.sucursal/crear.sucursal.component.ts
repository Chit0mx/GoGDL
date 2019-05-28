import { Component } from "@angular/core";
import { LugaresService } from "../services/lugares.service";
import { AutorizacionService } from '../services/autorizacion.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: "app-crear-sucursal",
  templateUrl: "./crear.sucursal.component.html"
})
export class CrearSucursalComponent {
  lat: number = 20.6430428;
  lng: number = -103.3703034;
  lugares = null;
  loggedUser;
  usuarioDB:any = {};
  mostrarC:Boolean = false;
  lugar:any = {}
  file: any;
  constructor(private lugaresService: LugaresService,
    private autorizacionService:AutorizacionService,
    private storage: AngularFireStorage,
    private angularFireAuth: AngularFireAuth,
    private router: Router
    ) {
    lugaresService
      .getLugares()
      .valueChanges()
      .subscribe(lugares => {
        this.lugares = lugares;
      });

    this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
    this.autorizacionService.obtenerUsuario()
    .valueChanges().
    subscribe(usuarioDB => {
      this.usuarioDB = usuarioDB;
    });
  }

  public mostrarCrear(id) {
    this.lugaresService
        .getLugar(id)
        .valueChanges()
        .subscribe(lugar => {
          this.lugar = lugar;
        });
    this.mostrarC = !this.mostrarC;
  }

  guardarLugar(idA) {
    var direccion = this.lugar.calle + "," + this.lugar.ciudad + "," + this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion).subscribe((result: any) => {
      this.lugar.lat = result.results[0].geometry.location.lat;
      this.lugar.lng = result.results[0].geometry.location.lng;
      this.lugar.fotos = null;
      this.lugar.id = Date.now();
      this.lugar.AtraccionPrincipal = idA;
      this.lugar.propietario = this.angularFireAuth.auth.currentUser.uid;
      this.lugar.calificacion = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      this.lugar.estoyaqui = 0;
      this.lugar.resenias = null;
      this.lugaresService.guardarLugar(this.lugar);
      const filePath = "atracciones/" + this.lugar.id;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      swal.fire(
        "Sucursal Creada!",
        "Tu sucursal se a creado con exito",
        "success"
      );
      this.router.navigate([`/destacados`]);
      this.lugar = {};
    });
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}
