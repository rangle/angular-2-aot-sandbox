import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgReduxModule, NgRedux } from "ng2-redux";
import { CounterActions } from "./actions/counter.actions";


@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    CounterActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
