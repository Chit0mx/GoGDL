import {Injectable} from "@angular/core";
import { AngularFireDatabase} from  "angularfire2/database";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutorizacionService } from './autorizacion.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class LugaresService{
  profileUrl: Observable<string | null>;
  
  constructor (private afDB: AngularFireDatabase,
    private http: HttpClient, 
    private autorizacion: AutorizacionService,
    private angularFireAuth: AngularFireAuth,
    private storage: AngularFireStorage
    ){}
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
  
  public desocultarLugar(lugar) {
    this.guardarLugar(lugar);
    const id = this.angularFireAuth.auth.currentUser.uid;
    this.afDB.database.ref(`users/${id}/lugaresOcultos/${lugar.id}`).remove();
  }

  public ocultarLugar(lugar){
    const id = this.angularFireAuth.auth.currentUser.uid;
    this.afDB.database.ref(`users/${id}/lugaresOcultos/${lugar.id}`).set(lugar);
    this.borrarLugar(lugar.id);
  }
  
  public getLugaresOcultos(){
    const id = this.angularFireAuth.auth.currentUser.uid;
    return this.afDB.list(`users/${id}/lugaresOcultos/`);
  }
  public getLugarOculto(id){
    const idU = this.angularFireAuth.auth.currentUser.uid;
    return this.afDB.object(`users/${idU}/lugaresOcultos/${id}`);
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

  /*Fotos de la atracción*/

  public subirImagenNueva(idA, idImagen) {
    this.afDB.database.ref('lugares/' + idA + '/fotos/' + idImagen).set({
      id: idImagen
    });
  }  

  public borrarImagen(idA, idImagen){
    this.afDB.database.ref('lugares/' + idA + '/fotos/' + idImagen).remove();
  }

  public getImagenes(idA){
    return this.afDB.list(`lugares/${idA}/fotos`);
  }

  public agregarEstoyAqui(idlugar){
    this.autorizacion.agregarEstoyAqui(idlugar);
    this.afDB.object(`lugares/${idlugar}/estoyaqui`).query
    .ref.transaction(estoyaqui => {
       return estoyaqui + 1;
    })
  }

  public agregarVisto(idlugar){
    this.afDB.object(`lugares/${idlugar}/visto`).query
    .ref.transaction(visto => {
       return visto + 1;
    })
  }
}

