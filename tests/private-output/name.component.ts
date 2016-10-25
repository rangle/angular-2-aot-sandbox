import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "name",
  template: `
    <h1>World</h1>
    <button (click)="click(true)">Click</button>`
})
export class NameComponent {
 @Output() private onClicked = new EventEmitter<boolean>();

 clicked: boolean = false;

 click(agreed: boolean) {
   this.onClicked.emit(true);
   this.clicked = true;
 }
};
