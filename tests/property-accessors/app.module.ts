import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ErrorEventHandlers } from "./handlers";
import { FooModule } from "./foo.module";
@NgModule({
  imports: [
    BrowserModule,
    FooModule.provideFoo(ErrorEventHandlers)
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {}
};
