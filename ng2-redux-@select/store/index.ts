import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";

export class IAppState {
  counter?: number;
};

export const rootReducer = combineReducers<IAppState>({
  counter: counterReducer,
});

export const enhancers = [];
