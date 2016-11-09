import { NgModule, OpaqueToken } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { barConst } from "./bar";


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [ { provide: AppService, useValue: barConst }]
})
export class AppModule {};
