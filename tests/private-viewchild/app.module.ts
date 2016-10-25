import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ChildDirective } from "./child.directive";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    ChildDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
