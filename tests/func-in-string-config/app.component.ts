import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app",
  template: `Hello real world`,
  host: {
    '[class]': 'getClasses()'
  },
  styles: [`
    .fancy-styling {
        color: #f00;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {}

  getClasses() {
    return 'fancy-styling';
  }
};
