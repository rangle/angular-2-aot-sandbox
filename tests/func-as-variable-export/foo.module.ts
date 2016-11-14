import { OpaqueToken, NgModule, ModuleWithProviders } from "@angular/core";

@NgModule({})
export class FooModule {
  static provideFoo(_foo: any): ModuleWithProviders {
    return {
      ngModule: FooModule,
      providers: [],
    };
  }
}
