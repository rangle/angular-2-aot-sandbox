import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app",
  template: `
    <form [formGroup]="helloForm" (ngSubmit)="greet()">
      <label for="greetingMessage">Greeting Message</label>
      <input type="text" name="greetingMessage" id="greetingMessage" [formControl]="greetingMessage">
      <button type="submit">Greet</button>
    </form>
    <p>At least of length {{helloForm.controls["greetingMessage"].errors?.minlength.requiredLength}}</p>`
})
export class AppComponent {
  helloForm: FormGroup;
  greetingMessage: FormControl;

  constructor (builder: FormBuilder) {
    this.greetingMessage = new FormControl("", Validators.minLength(4));
    this.helloForm = builder.group({
      greetingMessage: this.greetingMessage
    });
  }

  greet () {
    console.log(this.helloForm.controls["greetingMessage"].errors);
  }
};
