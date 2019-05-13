import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ArticulosService } from '../services/articulos.service';
import swal from "sweetalert2";

@Component({
  selector: "app-crearArticulos",
  templateUrl: "./articulos.crear.component.html"
})
export class CrearArticulosComponent {
  articulo: any = {};
  id: any = null;
  idA: any = null;
  file: any;
  constructor(
    private articulosService: ArticulosService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage,
    private angularFireAuth: AngularFireAuth,
    private afDB: AngularFireDatabase,
    private router: Router
  ) {
    this.id = this.route.snapshot.params["id"];
  }

  guardarLugar() {
      this.articulo.id = this.id + Date.now();
      this.articulo.atraccion = this.id;
      this.articulosService.guardarArticulo(this.articulo);
      const filePath = "articulos/" + this.articulo.id;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      swal.fire(
        "Evento/Promoción creada con exito",
        "Se a creado un evento o promoción",
        "success"
      );
      this.router.navigate(['/detalle/' + this.articulo]);
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }
}