import { Injectable } from "@angular/core";

@Injectable()
export class HelloService {
  getHello(fake: boolean) {
    if (fake) {
      return "Hello Fake World";
    }
    return "Hello World";
  }
}
