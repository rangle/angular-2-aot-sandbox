### ngrx-compose

Direct use of compose does not work with AoT, it requires a wrapper.

Don't:
```ts
//reducers/index.ts
const reducers = {
  counter: fromCounter.counterReducer,
};
const reducer: ActionReducer<State> = compose(storeLogger(), combineReducers)(reducers);

//app.module.ts
//...
import { reducer } from "./reducers";
@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer)
  ],
  //...
})
export class AppModule {}
```
Do:
```ts
//reducers/index.ts
const reducers = {
  counter: fromCounter.counterReducer,
};
const developmentReducer: ActionReducer<State> = compose(storeLogger(), combineReducers)(reducers);
export function reducer(state: any, action: any) {
  return developmentReducer(state, action);
};

//app.module.ts
//...
import { reducer } from "./reducers";
@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer)
  ],
  //...
})
export class AppModule {}
```
