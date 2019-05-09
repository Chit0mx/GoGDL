import {Injectable} from "@angular/core";
import { AngularFireDatabase} from  "angularfire2/database";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutorizacionService } from './autorizacion.service';

@Injectable()
export class LugaresService{
  profileUrl: Observable<string | null>;
  
  constructor (private afDB: AngularFireDatabase, private http: HttpClient, private autorizacion: AutorizacionService){}
  public getLugares(){
      return this.afDB.list('lugares/');
  }
  public getLugar(id){
    return this.afDB.object('lugares/' + id);
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
  public guardarResenia(resenia, lugar){
    this.autorizacion.hacerResenia(lugar.id);
    this.afDB.database.ref('lugares/' + lugar.id + '/resenias').push(resenia);
    alert("Haz hecho una reseña de este lugar");
  }
  public obtenerResenias(id){
    return this.afDB.list('lugares/' + id + '/resenias');
  }
  public obtenerGeoData(direccion){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2JEN5BecGIXzKVY697OXtB90xvoeGfuE&address='+ direccion);
  }
}

