import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LugaresService } from "../services/lugares.service";
import { Observable } from "rxjs";
import { AngularFireStorage } from "angularfire2/storage";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html"
})
export class DetalleComponent {
  id = null;
  lugar: any = {};
  nombre = null;
  profileUrl: Observable<string | null>;
  precio: any;
  constructor(
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private lugaresService: LugaresService
  ) {
    this.id = this.route.snapshot.params["id"];
    this.lugaresService
      .buscarlugar(this.id)
      .valueChanges()
      .subscribe(lugar => {
        this.lugar = lugar;
      });
    const ref = this.storage.ref("atracciones/" + this.id);
    this.profileUrl = ref.getDownloadURL();
  }
}
