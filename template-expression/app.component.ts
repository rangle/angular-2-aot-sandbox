import { Component } from "@angular/core";

let answer = "42";
let greeting = "Hello ";

@Component({
  selector: "app",
  template: greeting + answer
})
export class AppComponent {};
