import { ModuleWithProviders } from "@angular/core";
import { FooModule } from "./foo.module";

export const foo = function foo(state: number) {
  return "foo" + state;
}
