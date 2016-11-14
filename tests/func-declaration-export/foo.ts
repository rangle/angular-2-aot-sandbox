import { ModuleWithProviders } from "@angular/core";
import { FooModule } from "./foo.module";

export function foo(state: number) {
  return "foo" + state;
}
