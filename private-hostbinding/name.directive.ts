import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[name]"
})
export class NameDirective {
  @HostBinding("class.world") private isWorld: boolean = false;
}
