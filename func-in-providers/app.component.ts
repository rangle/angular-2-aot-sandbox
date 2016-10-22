import { Component } from "@angular/core";
import { AppService } from "./app.service";

@Component({
  selector: "app",
  template: `Hello {{appService.name}}`
})
export class AppComponent {
  constructor(public appService: AppService) {}
};
