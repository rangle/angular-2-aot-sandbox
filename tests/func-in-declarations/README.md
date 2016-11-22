### func-in-declarations
Don't:
```ts
function someLoader() {...}
@NgModule({
  //...
  declarations: someLoader(),
  //...
})
export class AppModule {};
```

Apply `@angular/router` or other Angular logic to re-implement the same thing.
