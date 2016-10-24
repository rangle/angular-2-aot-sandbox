import { Component } from "@angular/core";
import { HelloService } from "./hello.service";

@Component({
  selector: "app",
  template: `{{ greeting }}`
})
export class AppComponent {
  greeting: string;
  constructor(helloService: HelloService<boolean>) {
    this.greeting = helloService.getHello(true);
  }
};
