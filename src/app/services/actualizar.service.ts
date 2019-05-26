import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import swal from "sweetalert2";

@Injectable()
export class PwaService {
  constructor(private swUpdate: SwUpdate) {
    swUpdate.available.subscribe(event => {
      swal
        .fire({
          title: "Existe una nueva version de GoGDL",
          text: "Deseas descargarla?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si,descargar actualizacion"
        })
        .then(result => {
          if (result.value) {
            window.location.reload();
            swal.fire(
              "Se ha actualizado GoGDL",
              "Ahora puedes seguir ultilizando la página",
              "info"
            );
          }
        });
    });
  }
}
