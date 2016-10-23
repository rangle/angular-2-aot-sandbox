import { Directive } from "@angular/core";

@Directive({selector: "child-directive"})
export class ChildDirective {
  value: number = 42;
}
