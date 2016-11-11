import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { serviceProviders } from "./services/service-providers";
@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: serviceProviders
})
export class AppModule {};
