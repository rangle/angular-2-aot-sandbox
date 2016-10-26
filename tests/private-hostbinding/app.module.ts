import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NameDirective } from "./name.directive";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    NameDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
