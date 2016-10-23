import { Component } from "@angular/core";

@Component({
  selector: "app",
  template: `
    <tab>
      <pane id="1"></pane>
      <pane id="2"></pane>
      <pane id="3" *ngIf="shouldShow"></pane>
    </tab>
    <button (click)="show()">Show 3</button>
  `,
})
export class AppComponent {
  shouldShow = false;
  show() { this.shouldShow = true; }
}
