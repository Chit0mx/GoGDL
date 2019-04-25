import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultLugar = [];
    for (const lugar of value) {
      if (lugar.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultLugar.push(lugar);
      }
    }
    return resultLugar;
  }
}
