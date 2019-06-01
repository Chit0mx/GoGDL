import { Component, ChangeDetectorRef } from "@angular/core";
import { LugaresService } from "../services/lugares.service";
import { AutorizacionService } from "../services/autorizacion.service";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { GeoLocationService } from "../services/geolocation.service";
@Component({
  selector: "app-usuario",
  templateUrl: "./usuario.component.html"
})
export class UsuarioComponent {
  title = "GoGdl";
  lugares: any;
  lugaresOcultos: any;
  loggedUser: any = null;
  usuarioDB: any;
  //latU:number;
  //lngU:number;
  cordinates: any;
  promedios: any = [];
  promedio = 0;
  /*options = {
    timeout : 500,
    maximumAge: 0
  };*/
  errorMsg: string;
  currentLocation: any = null;

  constructor(
    private afDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private lugaresService: LugaresService,
    private autorizacionService: AutorizacionService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private geoLocationService: GeoLocationService
  ) {
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
    this.autorizacionService
      .obtenerUsuario()
      .valueChanges()
      .subscribe(usuarioDB => {
        this.usuarioDB = usuarioDB;
      });
    this.searchByCurrent();
  }

  public bajaUser() {
    this.autorizacionService.bajaUsuario();
    this.router.navigate([`/inicio`]);
  }
  public hacerEmpresario() {
    this.autorizacionService.hacerEmpresario();
  }

  public desocultar(lugar, Activo) {
    if (Activo) {
      swal
        .fire({
          title: "¿Esta seguro que desea dejar de ocultar esta atracción?",
          text: "Volvera a estar disponible para todos los usuarios de GoGDL",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, dejar de ocultar"
        })
        .then(result => {
          if (result.value) {
            this.lugaresService.desocultarLugar(lugar);
            this.router.navigate([`/detalle/${lugar.id}`]);
            swal.fire(
              "La atracción ya no esta oculta",
              "Ahora esta disponible para todos los usuarios",
              "info"
            );
          }
        });
    } else {
      swal.fire(
        "No puede desocultar el lugar",
        "Su usuario esta inactivo, debe hacerse un usuario activo para desocultar el lugar",
        "info"
      );
    }
  }

  public mostrarCal(n1, n2, n3, n4, n5) {
    this.promedio =
      Math.round(
        ((5 * n5 + 4 * n4 + 3 * n3 + 2 * n2 + 1 * n1) /
          (n5 + n4 + n3 + n2 + n1)) *
          1000
      ) / 1000;
    this.promedios.push(this.promedio);
  }

  public range(start, stop, step) {
    if (typeof stop == "undefined") {
      stop = start;
      start = 0;
    }

    if (typeof step == "undefined") {
      step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }

    return result;
  }

  searchByCurrent() {
    let self = this;
    const accuracy = { enableHighAccuracy: true };
    self.geoLocationService.getLocation(accuracy).subscribe(
      position => {
        //console.log(position);
        self.currentLocation = position;
        self.ref.detectChanges();
      },
      error => {
        self.errorMsg = error;
        self.ref.detectChanges();
      }
    );
  }

  public Activar() {
    this.autorizacionService.hacerUsuarioActivo();
    this.lugaresService.desocultarLugares(this.loggedUser);
  }
}
