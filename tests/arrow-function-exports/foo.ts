import { ModuleWithProviders } from "@angular/core";
import { FooModule } from "./foo.module";

export const foo = (state: number) => { return "foo" + state; };
