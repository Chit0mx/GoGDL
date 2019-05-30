import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticulosService } from '../services/articulos.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { LugaresService } from '../services/lugares.service';
import { AutorizacionService } from '../services/autorizacion.service';
import swal from "sweetalert2";

@Component({
    selector: "app-ArticulosDetalle",
    templateUrl: "./articulos.detalle.component.html"
})

export class ArticuloDetalleComponent {
    articulo:any = {};
    id:any;
    articuloURL: Observable<string | null>;
    lugar:any;
    idLugar:any;
    loggedUser;
    loggedIn = false;
    constructor (private autorizacionService:AutorizacionService, 
        private lugaresService:LugaresService, 
        private storage: AngularFireStorage, 
        private route:ActivatedRoute, 
        private articulosService:ArticulosService,
        private router: Router) {
        this.id = this.route.snapshot.params['id'];
        this.idLugar = this.route.snapshot.params['idlugar'];
        const ref = this.storage.ref('articulos/' + this.id);
        this.articuloURL = ref.getDownloadURL();
        this.articulosService.getArticulo(this.id).
        valueChanges().
        subscribe(articulo => {
          this.articulo = articulo;
        });
        this.lugaresService.buscarlugar(this.idLugar).
        valueChanges().
        subscribe(lugar => {
        this.lugar = lugar;
        });
        this.autorizacionService.isLogged()
        .subscribe((result) => {
        if(result && result.uid){
            this.loggedIn = true;
            setTimeout(() => {
            this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
            }, 500);
        } else {
            this.loggedIn = false;
        }
        }, (error) => {
        this.loggedIn = false;
        })
    }

    public eliminarAtraccion() {
        this.articulosService.borrarArticulo(this.id);
        const filePath = `articulos/${this.id}`;
        this.storage.ref(filePath).delete();
        this.router.navigate(["/detalle/" + this.idLugar]);
        swal.fire(
            "Evento/promocion eliminado",
            "Sea eliminado el evento/promocion con exito",
            "info"
          );
    }
}