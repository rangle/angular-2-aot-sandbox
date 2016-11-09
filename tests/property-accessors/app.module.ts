import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ErrorEventHandlers } from "./handlers";

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
  constructor(errorEventHandlers: ErrorEventHandlers) {}
};
