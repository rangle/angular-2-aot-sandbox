import { Injectable } from "@angular/core";
import { NgRedux } from "ng2-redux";
import { IAppState } from "../store";

/**
 * Action creators in Angular 2. We may as well adopt a more
 * class-based approach to satisfy Angular 2"s OOP idiom. It
 * has the advantage of letting us use the dependency injector
 * as a replacement for redux-thunk.
 */
@Injectable()
export class CounterActions {
  constructor (
    private ngRedux: NgRedux<IAppState>) {}

  static INCREMENT_COUNTER: string = "INCREMENT_COUNTER";
  static DECREMENT_COUNTER: string = "DECREMENT_COUNTER";

  increment(): void {
    this.ngRedux.dispatch({ type: CounterActions.INCREMENT_COUNTER });
  }

  decrement(): void {
    this.ngRedux.dispatch({ type: CounterActions.DECREMENT_COUNTER });
  }
}
