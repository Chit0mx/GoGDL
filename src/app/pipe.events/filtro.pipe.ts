import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filtro"
})
export class FiltroPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultArt = [];
    for (const articulo of value) {
      if (articulo.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultArt.push(articulo);
      }
    }
    return resultArt;
  }
}
