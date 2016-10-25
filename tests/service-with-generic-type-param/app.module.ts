import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { HelloService } from "./hello.service";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    HelloService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
