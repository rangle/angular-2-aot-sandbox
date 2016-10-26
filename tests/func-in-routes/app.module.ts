import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppViewComponent } from "./app-view.component";
import { routing } from "./app.routes";

@NgModule({
  imports: [
    BrowserModule,
    routing,
  ],
  declarations: [
    AppComponent,
    AppViewComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
