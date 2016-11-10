import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { StoreModule, combineReducers } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { storeLogger } from "ngrx-store-logger";
import { counterReducer } from "./counter";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(compose(
      storeLogger(), combineReducers
    )({counter: counterReducer}))
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
