import {Injectable} from "@angular/core";
import { AngularFireDatabase} from  "angularfire2/database";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LugaresService{
  profileUrl: Observable<string | null>;
  
  constructor (private afDB: AngularFireDatabase, private http: HttpClient){}
  public getLugares(){
      return this.afDB.list('lugares/');
  }
  public getLugar(id){
    return this.afDB.list('lugares/' + id);
}
  public buscarlugar(id){
    return this.afDB.object('lugares/'+ id);
  }
  public guardarLugar(lugar){
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }
  public editarLugar(lugar){
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }
  public obtenerGeoData(direccion){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2JEN5BecGIXzKVY697OXtB90xvoeGfuE&address='+ direccion);
  }
}

