import { Directive, ElementRef,Renderer2, Input, OnInit } from "@angular/core";

@Directive({
    selector: '[resaltar]'
})
export class ResaltarDirective implements OnInit{
    constructor(private elRef:ElementRef, private renderer: Renderer2){}
    @Input('resaltar') plan: string ='';
    ngOnInit(){
        if(this.plan==='pagado'){
            this.renderer.setStyle(this.elRef.nativeElement,'backgroud-color','red');
            this.renderer.setStyle(this.elRef.nativeElement,'font-weight','bold');

        }
    }
}