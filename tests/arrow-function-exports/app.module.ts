import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent} from "./app.component";
import { foo } from "./foo";
@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log(foo(1));
  }
};
