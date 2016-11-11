import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
const $ = require("jquery");
export function jqueryFactory () {
  return $;
}

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: "JqueryService", useFactory: jqueryFactory},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
