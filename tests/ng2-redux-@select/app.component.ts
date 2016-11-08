import { Component } from "@angular/core";
import { NgRedux, DevToolsExtension, select } from "ng2-redux";
import { Observable } from "rxjs/Observable";
import { CounterActions } from "./actions/counter.actions";
import { IAppState, rootReducer, enhancers } from "./store";

@Component({
  selector: "app",
  providers: [ CounterActions ],
  template: `
    <button (click)="actions.increment()">Increment</button>
    <div>Current Count: {{ counter$ | async }}</div>
    <button (click)="actions.decrement()">Decrement</button>

    <button (click)="actions.reset()">Reset Counter</button>
  `
})
export class AppComponent {
  @select() counter$: Observable<number>;

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
