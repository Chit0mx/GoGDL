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
  public borrarLugar(id){
    return this.afDB.database.ref('lugares/' + id).remove();
  }
  public guardarLugar(lugar){
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }
  public editarLugar(lugar){
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }

  public guardarResenia(resenia, lugar){
    this.autorizacion.hacerResenia(lugar.id);
    this.afDB.database.ref('lugares/' + lugar.id + '/resenias/' + resenia.id).set(resenia);
  }

  public calificar(idlugar, numero){
    this.autorizacion.calificado(idlugar, numero);
    this.afDB.object(`lugares/${idlugar}/calificacion/${numero}`).query
    .ref.transaction(calificacion => {
       return calificacion + 1;
    })
  }

  public reCalificar(idlugar, n){
    this.autorizacion.noCalificado(idlugar);
    this.afDB.object(`lugares/${idlugar}/calificacion/${n}`).query
    .ref.transaction(calificacion => {
       return calificacion - 1;
    })
  }

  public obtenerResenias(id){
    return this.afDB.list('lugares/' + id + '/resenias');
  }

  public borrarResenia(id, idUsr){
    this.autorizacion.rehacerResenia(id);
    this.afDB.object('lugares/' + id + '/resenias/' + idUsr).remove();
  }

  public obtenerGeoData(direccion){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB2JEN5BecGIXzKVY697OXtB90xvoeGfuE&address='+ direccion);
  }
}

