import { Component } from "@angular/core";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-reporte",
  templateUrl: "./reporte.component.html"
})
export class ReporteComponent {
  private faEnvelope = faEnvelope;
  private email:any;
  constructor() {
    this.email = "efrainbond@hotmail.com";
  }
}
