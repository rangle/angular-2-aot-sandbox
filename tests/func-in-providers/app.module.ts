import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: AppService, useFactory: () => { return { name: "world test" }; }},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
