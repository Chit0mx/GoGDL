import { Component } from "@angular/core";
import { LugaresService } from "../services/lugares.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: "app-crear",
  templateUrl: "./crear.component.html"
})
export class CrearComponent {
  lugar: any = {};
  id: any = null;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  file: any;
  constructor(
    private lugaresService: LugaresService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private angularFireAuth: AngularFireAuth,
    private afDB: AngularFireDatabase
  ) {
    this.id = this.route.snapshot.params["id"];
    if (this.id != "new") {
      this.lugaresService
        .getLugar(this.id)
        .valueChanges()
        .subscribe(lugar => {
          this.lugar = lugar;
        });
    }
  }

  guardarLugar() {
    var direccion = this.lugar.calle + "," + this.lugar.ciudad + "," + this.lugar.pais;
    this.lugaresService.obtenerGeoData(direccion).subscribe((result: any) => {
      this.lugar.lat = result.results[0].geometry.location.lat;
      this.lugar.lng = result.results[0].geometry.location.lng;
      if (this.id != "new") {
        this.lugaresService.editarLugar(this.lugar);
        const filePath = "atracciones/" + this.lugar.id;
        this.storage.ref(filePath).delete();
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.file);
        alert("Atraccion Editada con exito");
      } else {
        this.lugar.id = Date.now();
        this.lugar.propietario = this.angularFireAuth.auth.currentUser.uid;
        this.lugaresService.guardarLugar(this.lugar);
        const filePath = "atracciones/" + this.lugar.id;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.file);
        alert("Atraccion Guardada con exito");
      }
      this.lugar = {};
    });
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}