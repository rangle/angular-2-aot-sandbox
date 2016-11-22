### func-in-providers-useFactory
Instead of using function directly, export it first in another module and import it back.

Don't:
```ts
@NgModule({
  //...
  providers: [
    { provide: AppService, useFactory: () => { return { name: "world test" }; }},
  ],
  //...
})
export class AppModule {};

```
Do:
```ts
import { randomFactory } from "./random.factory.ts"
@NgModule({
  //...
  providers: [
    { provide: AppService, useFactory: randomFactory }},
  ],
  //...
})
export class AppModule {};

```
