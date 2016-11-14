import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent} from "./app.component";
import { FooModule } from "./foo.module";
import { foo } from "./foo";

@NgModule({
  imports: [
    BrowserModule,
    FooModule.provideFoo(foo),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
