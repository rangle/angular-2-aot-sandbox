import { Component } from "@angular/core";

@Component({
  selector: "app",
  template: `Hello <name [name]="name"></name>`
})
export class AppComponent {
  name: String = "World";
};
