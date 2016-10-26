import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app",
  template: `
    <form [formGroup]="helloForm" (ngSubmit)="greet()">
      <label for="greetingMessage">Greeting Message</label>
      <input type="text" name="greetingMessage" id="greetingMessage" [formControl]="greetingMessage">
      <button type="submit">Greet</button>
    </form>`
})
export class AppComponent {
  helloForm: FormGroup;
  greetingMessage: FormControl;

  constructor (builder: FormBuilder) {
    this.greetingMessage = new FormControl("", []);
    this.helloForm = builder.group({
      greetingMessage: this.greetingMessage
    });
  }

  greet () {
    console.log(this.helloForm.controls["greetingMessage"].value);
  }
};
