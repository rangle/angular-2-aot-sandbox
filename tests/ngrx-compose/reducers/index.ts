import "@ngrx/core/add/operator/select";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/let";
import { Observable } from "rxjs/Observable";
import { combineLatest } from "rxjs/observable/combineLatest";
import { ActionReducer, combineReducers } from "@ngrx/store";
import { compose } from "@ngrx/core/compose";
import * as fromCounter from "./counter";
import { storeLogger } from "ngrx-store-logger";

export interface State {
  counter: fromCounter.AppState;
}

const reducers = {
  counter: fromCounter.counterReducer,
};

const developmentReducer: ActionReducer<State> = compose(storeLogger(), combineReducers)(reducers);

export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
};
