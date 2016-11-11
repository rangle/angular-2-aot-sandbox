import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { StoreModule, combineReducers } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import { storeLogger } from "ngrx-store-logger";
import { reducer } from "./reducers";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer)
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
