import { Component } from "@angular/core";

function Override(label: string) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      configurable: false,
      get: () => label,
      set: (value) => {},
    });
  };
}

export class World {
  @Override("World 42")
  name: string = "42";
}

const world = new World();

@Component({
  selector: "app",
  template: `Hello {{greeting.name}}`
})
export class AppComponent {
  greeting: World = world;
  constructor() {
    console.log(this.greeting.name);
  }
};
