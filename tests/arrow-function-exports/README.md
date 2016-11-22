### arrow-function-exports

Arrow function does not work with AoT when it is passed to an `NgModule`.

Don't:
```ts
export const couterReducer = (state, action: Action) => {
  // ...
}
```

Do:
```ts
export function counterReducer(state, action: Action) {
  // ...
}
```
