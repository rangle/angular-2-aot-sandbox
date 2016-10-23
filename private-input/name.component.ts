import { Component, Input } from "@angular/core";

@Component({
  selector: "name",
  template: `<h1>{{name}}</h1>`
})
export class NameComponent {
 @Input() private name: String;
};
