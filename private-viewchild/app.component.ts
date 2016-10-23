import { Component, AfterViewInit, ViewChild } from "@angular/core";
import { ChildDirective } from "./child.directive";

@Component({
  selector: "app",
  template: `Hello World <child-directive></child-directive>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild(ChildDirective) private child: ChildDirective;

  ngAfterViewInit() {
    console.log(this.child.value);
  }
};
