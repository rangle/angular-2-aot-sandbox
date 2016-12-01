import { Injectable } from '@angular/core';
import { ActionReducer, Action } from "@ngrx/store";
import { Actions, Effect } from '@ngrx/effects';
import "rxjs/add/operator/map";

export interface AppState {
  counter: number;
}

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";
export const RESET_SUCCESS = "RESET SUCCESS";

export function counterReducer(state: number = 0, action: Action): number {
    switch (action.type) {
        case INCREMENT:
            return state + 1;

        case DECREMENT:
            return state - 1;

        case RESET_SUCCESS:
            return 0;

        default:
            return state;
    }
};

@Injectable()
export class CounterEffects {
    constructor(
        private actions$: Actions
    ) { }

    @Effect() reset$ = this.actions$
        .ofType(RESET)
        .map(() => ({ type: RESET_SUCCESS }));
}
