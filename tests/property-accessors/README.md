### property-accessors

The es6 property accessors are not supported by AoT if it is passed to an NgModule.

Don't:
```ts
import { ERROR, WARNING } from "./definitions";

export function handler1() {};
export function handler2() {};
export const ErrorEventHandlers = {
  [ERROR]: {
    handler: handler1
  },
  [WARNING]: {
    handler: handler2
  }
};
```
Do:
```ts
export function handler1() {};
export function handler2() {};
export const ErrorEventHandlers = {
  'ERROR': {
    handler: handler1
  },
  'WARNING': {
    handler: handler2
  }
};
```
