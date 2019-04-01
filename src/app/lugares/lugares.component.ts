import { Component } from '@angular/core';
import{LugaresService}from "../services/lugares.service";
@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent {
  title = 'GoGdl';

lat: number = 20.6430428;
lng: number = -103.3703034;
lugares =null;

  constructor(private lugaresService: LugaresService) {
    lugaresService.getLugares().
    valueChanges().
    subscribe(lugares => {
      this.lugares = lugares;
    });
    }

  }
