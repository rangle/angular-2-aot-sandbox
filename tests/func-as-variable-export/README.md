### func-as-variable-export

Export function as variable is fine with AoT except when it is passed to an NgModule.

The solution is to export function directly.

Don't:
```ts
//foo.ts
export const foo = function foo(state: number) {
  return "foo" + state;
}

//app.module.ts
@NgModule({
  imports: [
    //...
    FooModule.provideFoo(foo),
  ],
  //...
})
export class AppModule {};
```
Do:
```ts
//foo.ts
export function foo(state: number) {
  return "foo" + state;
}

//app.module.ts
@NgModule({
  imports: [
    //...
    FooModule.provideFoo(foo),
  ],
  //...
})
export class AppModule {};
```
