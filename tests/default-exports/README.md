### default-exports
Default exports are not supported with AoT.

Don't:
```ts
export default class AppComponent {};
```
Do:
```ts
export class AppComponent {};
