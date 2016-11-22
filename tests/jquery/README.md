### jquery

To use jQuery with AoT, one way is to use the `webpack.ProvidePlugin` to provide jquery as global variable; another way is to inject jquery as a service like this:
```ts
//...
const $ = require("jquery");
export function jqueryFactory () {
  return $;
}
@NgModule({
  //...
  providers: [
    { provide: "JqueryService", useFactory: jqueryFactory},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
```
Notice that `useValue` here does not work.
