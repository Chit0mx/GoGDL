import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ArticulosService } from '../services/articulos.service';
import swal from "sweetalert2";
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-crearArticulos",
  templateUrl: "./articulos.crear.component.html"
})
export class CrearArticulosComponent {
  articulo: any = {};
  id: any = null;
  idA: any = null;
  file: any;
  mst = false;
  resenia: any = {};
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

  public guardarLugar() {
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
      this.router.navigate(['/detalle/' + this.id]);
  }

  public uploadFile(event) {
    this.file = event.target.files[0];
  }

  public mostrar(ms) {
    this.mst = ms;
  }
  public botFiltro(){
    var grocerias = ["puta","puto","marica","mierda","chingadera","chinga","puteria","mamada","chupala","alv","chupala","verga","pendejo","chingar","mamar","mamando","puteria","chingado","culo","culero","estupido","idiota","baboso","cabron","pito","tarado","tonto","cagas","joto","prostituta","golfa","malparida","malparido","ano","pene","vagina","tetas","chichis","bubis","jodido","madrazo","castra","pinche","emputado","encabronado","bastardo"];
    var nodo = (document.getElementById("desc") as any);
    var textarea = nodo.value.toLowerCase();
    for(var i = 0; i < grocerias.length; i++){
        const regex = new RegExp("(^|\\s)"+grocerias[i]+"($|(?=\\s))","gi");
        textarea = textarea.replace(regex, "!@$$#;");
    }
    nodo.value = textarea;
    this.articulo.descripcion = nodo.value;
    this.guardarLugar();
  }
}