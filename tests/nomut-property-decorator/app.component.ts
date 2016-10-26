import { Component } from "@angular/core";

function ReadOnly(target: any, key: string) {
  Object.defineProperty(target, key, { writable: false });
}

class World {
  @ReadOnly
  name: string;
}

const world = new World();

@Component({
  selector: "app",
  template: `Hello {{greeting.name}}`
})
export class AppComponent {
  greeting: World = world;
  constructor() {
    console.log(this.greeting);
  }
};
