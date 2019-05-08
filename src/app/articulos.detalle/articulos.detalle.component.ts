import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticulosService } from '../services/articulos.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
    selector: "app-ArticulosDetalle",
    templateUrl: "./articulos.detalle.component.html"
})

export class ArticuloDetalleComponent {
    articulo:any = {};
    id:any;
    articuloURL: Observable<string | null>;
    constructor (private storage: AngularFireStorage, private route:ActivatedRoute, private articulosService:ArticulosService,) {
        this.id = this.route.snapshot.params['id'];
        const ref = this.storage.ref('articulos/' + this.id);
        this.articuloURL = ref.getDownloadURL();
        this.articulosService.getArticulo(this.id).
        valueChanges().
        subscribe(articulo => {
          this.articulo = articulo;
        });
    }
}