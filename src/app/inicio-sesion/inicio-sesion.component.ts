import { Component } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html'
})
export class InicioSesionComponent {
  loginParams:any = {}
  constructor(private autorizacionService:AutorizacionService) {
    
  }
  login() {
    this.autorizacionService.login(this.loginParams.email, this.loginParams.password);
  }
}
