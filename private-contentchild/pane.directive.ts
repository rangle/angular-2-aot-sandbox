import { Input, Directive } from "@angular/core";

@Directive({selector: "pane"})
export class PaneDirective {
  @Input() id: string;
}
