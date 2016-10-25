import { Component } from "@angular/core";
import { NgRedux, DevToolsExtension, select } from "ng2-redux";
import { Observable } from "rxjs/Observable";
import { CounterActions } from "./actions/counter.actions";
import { IAppState, rootReducer, enhancers } from "./store";

@Component({
  selector: "app",
  providers: [ CounterActions ],
  template: `
  <p>
    Clicked: {{ counter$ | async }} times
    <button (click)="actions.increment()">+</button>
    <button (click)="actions.decrement()">-</button>
  </p>
  `
})
export class AppComponent {
  @select("counter") counter$: Observable<number>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    public actions: CounterActions) {
      this.ngRedux.configureStore(
      rootReducer,
      {},
      [],
      [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);
    }
}
