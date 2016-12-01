import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';
import { counterReducer, CounterEffects } from "./counter";

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore({ counter: counterReducer }),
    EffectsModule.run(CounterEffects)
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
