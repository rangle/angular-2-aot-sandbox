import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { NgReduxModule } from "ng2-redux";
import { CounterActions } from "./actions/counter.actions";


@NgModule({
  imports: [
    BrowserModule,
    NgReduxModule.forRoot(),
  ],
  declarations: [ AppComponent ],
  providers: [ CounterActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule {};
