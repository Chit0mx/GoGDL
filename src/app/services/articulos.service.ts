import {Injectable} from "@angular/core";
import { AngularFireDatabase} from  "angularfire2/database";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ArticulosService{
  profileUrl: Observable<string | null>;
  
  constructor (private afDB: AngularFireDatabase, private http: HttpClient) {
  }
  public getArticulos(){
      return this.afDB.list('articulos/');
  }
  public getArticulo(idA){
    return this.afDB.object('articulos/' +  idA);
  }
  public guardarArticulo(articulo){
    this.afDB.database.ref('articulos/' + articulo.id).set(articulo);
  }
  public editarArticulo(articulo){
    this.afDB.database.ref('articulos/' + articulo.id).set(articulo);
  }
  public borrarArticulo(idA){
    this.afDB.database.ref('articulos/' +  idA).remove();
  }
}

