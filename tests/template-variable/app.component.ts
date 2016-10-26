import { Component } from "@angular/core";

let answer = "42";
let greeting = "Hello " + answer;

@Component({
  selector: "app",
  template: greeting
})
export class AppComponent {};
