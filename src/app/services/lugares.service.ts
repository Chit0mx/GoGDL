import {Injectable} from "@angular/core";
import { AngularFireDatabase} from  "angularfire2/database";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LugaresService{
    lugares:any=[
        {id:1,plan:'pagado',cercania:1, distancia: 1,active: true, nombre:'Donas'},
        {id:2,plan:'gratuito',cercania:1, distancia: 1.8,active: true,nombre:'Floreria'},
        {id:3,plan:'pagado',cercania:2, distancia: 4,active: true,nombre:'Veterinaria'},
        {id:4,plan:'gratuito',cercania:2, distancia: 10,active: true,nombre:'Sushi'},
        {id:5,plan:'pagado',cercania:3, distancia: 14,active: true,nombre:'Hotel'},
        {id:6,plan:'gratuito',cercania:3, distancia: 25,active: true,nombre:'Zapateria'},
      ];
constructor (private afDB: AngularFireDatabase, private http: HttpClient){}
public getLugares(){
    return this.afDB.list('lugares/');
}
public buscarlugar(id){
    return this.afDB.object('lugares/'+ id);
  }
  public guardarLugar(lugar){
    console.log(lugar);
    this.afDB.database.ref('lugares/' + lugar.id).set(lugar);
  }
  public obtenerGeoData(direccion){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAt_e0228SLA3GJe3XFha1CuLOmlLVrvxc&address=' + direccion);
  }
}

