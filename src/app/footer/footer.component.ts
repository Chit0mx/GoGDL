import { Component, Input } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html"
})
export class FooterComponent {
  @Input() atraccion:any;
  @Input() propietario:any;
  constructor () {
    this.atraccion = 0;
    this.propietario = 0;
  }
}
