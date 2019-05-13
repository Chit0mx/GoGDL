import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from "../services/lugares.service";
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AutorizacionService } from '../services/autorizacion.service';
import { ArticulosService } from '../services/articulos.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import swal from "sweetalert2";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html"
})
export class DetalleComponent {
  id = null;
  lugar: any = {};
  articulos: any = {};
  nombre = null;
  profileUrl: Observable<string | null>;
  loggedUser:any = null;
  usuariolat:any;
  usuariolng:any;
  loggedIn = false;
  imgsArt:any = {};
  usuarioDB:any = {};
  lugarUsr:any = {};
  resenia: any = {};
  reseniaAutor: any = {};
  resenias: any = {};
  faStar = faStar;
  faDollarSign = faDollarSign;
  cal:any = {};
  promedio = 0;
  constructor (private autorizacionService:AutorizacionService, private storage: AngularFireStorage, private route:ActivatedRoute, private lugaresService:LugaresService, private articuloService:ArticulosService, private angularFireAuth: AngularFireAuth){
    this.id = this.route.snapshot.params['id'];
    const ref = this.storage.ref('atracciones/' + this.id);
    this.profileUrl = ref.getDownloadURL();
    this.lugaresService.buscarlugar(this.id).
    valueChanges().
    subscribe(lugar => {
      this.lugar = lugar;
    });
    this.articuloService.getArticulos().
    valueChanges().
    subscribe(articulos => {
      this.articulos = articulos;
    });
    this.lugaresService.obtenerResenias(this.id).
    valueChanges().
    subscribe(resenias => {
      this.resenias = resenias;
    });
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
        this.autorizacionService.obtenerLugarUsr(this.id)
          .valueChanges().
          subscribe((lugarUsr) => {
            if (lugarUsr != null) {
              this.lugarUsr = lugarUsr;
            } else {
              this.autorizacionService.quitarFavorito(this.id);
              this.autorizacionService.rehacerResenia(this.id);
              this.autorizacionService.quitarEstoyAqui(this.id);
              this.autorizacionService.noCalificado(this.id)
              this.lugarUsr = lugarUsr;
            }
          });
      } else {
        this.loggedIn = false;
      }
    }, (error) => {
      this.loggedIn = false;
    })
    navigator.geolocation.getCurrentPosition(this.mostrar);
  }

  public mostrar(pos) {
    this.usuariolat = pos.coords.latitude;
    this.usuariolng = pos.coords.longitude;
  }

  public favorita(){
    this.autorizacionService.agregarFavorito(this.id);
    swal.fire(
      "Atraccion Favorita",
      "La atraccion se a agregado a la lista de favoritos",
      "success"
    );
  }

  public noFavorita() {
    this.autorizacionService.quitarFavorito(this.id);
    swal.fire(
      "Atraccion ya no es Favorita",
      "La atraccion se a quitado de la lista de favoritos",
      "info"
    );
  }

  public estoyAqui(){
    this.autorizacionService.agregarEstoyAqui(this.id);
    swal.fire(
      "Atraccion visitada",
      "A visitado la atracción",
      "success"
    );
  }

  public guardarResenia() {
    this.resenia.id = this.angularFireAuth.auth.currentUser.uid;
    this.lugaresService.guardarResenia(this.resenia, this.lugar);
    swal.fire(
      "Reseña creada con exito",
      "Se a creado una reseña",
      "success"
    );
  }

  public rehacerResenia(idUsr) {
    this.lugaresService.borrarResenia(this.id, idUsr);
    swal.fire(
      "Ahora se puede crear otra reseña",
      "Ya es posible de crear o modificar la reseña",
      "info"
    );
  }

  public traerUsuarioEspecifico(id) {
    return this.autorizacionService.obtenerUsuarioEspecifico(id);
  }

  public calificar(n){
    this.lugaresService.calificar(this.id, n);
  }

  public reCalificar(n){
    this.lugaresService.reCalificar(this.id, n);
    swal.fire(
      "Ya se puede calificar el lugar",
      "Es posible volver a calificar el lugar",
      "info"
    );
  }

  public mostrarCal(n1, n2, n3, n4, n5, n) {
    this.promedio = Math.round((5 * n5 + 4 * n4 + 3 * n3 + 2 * n2 + 1 * n1) / (n5 + n4 + n3 + n2 + n1)*1000)/1000;
    debugger;
    if (n <= this.promedio) {
      this.cal[n] = true;
    } else {
      this.cal[n] = false;
    }
  }


  public range(start, stop, step) {
    if (typeof stop == 'undefined') {
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
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
}

