import { Directive, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: 'li[contar-clicks]'
})
export class ContarClicksDirective{
    clickN=0;
    @HostListener('click',['$event.target']) onclick(btn: any){
        console.log('a',btn,"Número de clicks: ",this.clickN++);

    }
}