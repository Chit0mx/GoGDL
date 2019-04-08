import {Injectable} from "@angular/core";
import { AngularFireDatabase} from  "angularfire2/database";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LugaresService{
constructor (private afDB: AngularFireDatabase, private http: HttpClient){}
public getLugares(){
    return this.afDB.list('lugares/');
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
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAt_e0228SLA3GJe3XFha1CuLOmlLVrvxc&address='+ direccion);
  }
  public getLugar(id) {
    return this.afDB.object('lugares/' + id);
  }
}

