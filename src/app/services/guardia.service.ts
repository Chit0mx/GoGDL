import {Injectable} from "@angular/core";
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate } from '@angular/router';
import { AutorizacionService } from './autorizacion.service';

@Injectable()
export class GuardiaService implements CanActivate{
  loggedIn = false;
  constructor(private autorizacionService:AutorizacionService){
    this.autorizacionService.isLogged()
    .subscribe((result) => {
      if(result && result.uid){
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }, (error) => {
      this.loggedIn = false;
    })
  }
  canActivate() {
    return this.loggedIn;
  }
}
