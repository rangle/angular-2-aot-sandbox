import { Injectable } from "@angular/core";

@Injectable()
export class HelloService<T> {
  getHello(fake: T) {
    if (fake) {
      return "Hello Fake World";
    }
    return "Hello World";
  }
}
