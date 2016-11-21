# Angular 2 AoT SandBox
This repo is used to formalize what we can and cannot do with ngc.

To run specific test case like `control`:
```
node sandbox-loader.js control
```
The default is to use `ngc` for AoT, but you can also use `@ngtools/webpack`:
```
node sandbox-loader.js control ngtools
```
or JiT:
```
node sandbox-loader.js control jit
```
The bundle files are inside `./dist/`, and to host:
```
npm run start
```
## Current Status

|              Test               |  AoT With `ngc`  |  AoT With `@ngtools/webpack`  |  JiT  |
| ------------------------------- | :--------------: | :---------------------------: | :---: |   
| control                         |        ✅        |               ✅              |   ✅   |
| form-control                    |        ✅        |               ✅              |   ✅   |
| func-in-string-config           |        ✅        |               ✅              |   ✅   |
| jquery                          |        ✅        |               ✅              |   ✅   |
| template-variable               |        ✅        |               ✅              |   ✅   |
| template-expression             |        ✅        |               ✅              |   ✅   |
| mut-property-decorator          |        ✅        |               ❌              |   ✅   |
| nomut-property-decorator        |        ✅        |               ❌              |   ✅   |
| ng2-redux                       |        ✅        |               ✅              |   ✅   |
| ng2-redux-@select               |        ✅        |               ❌              |   ✅   |
| ngrx                            |        ✅        |               ✅              |   ✅   |
| ngrx-compose                    |        ✅        |               ✅              |   ✅   |
| arrow-function-exports          |        ❌        |               ❌              |   ✅   |
| default-exports                 |        ❌        |               ❌              |   ✅   |
| form-control-error              |        ❌        |               ❌              |   ✅   |
| func-as-variable-export         |        ❌        |               ❌              |   ✅   |
| func-declaration-export         |        ✅        |               ✅              |   ✅   |
| func-in-declarations            |        ❌        |               ❌              |   ✅   |
| func-in-providers               |        ❌        |               ❌              |   ✅   |
| func-in-providers-useFactory    |        ❌        |               ❌              |   ✅   |
| func-in-providers-useValue      |        ❌        |               ❌              |   ✅   |
| func-in-routes                  |        ❌        |               ❌              |   ✅   |
| interpolated-es6                |        ❌        |               ❌              |   ✅   |
| property-accessors              |        ❌        |               ❌              |   ✅   |
| private-contentchild            |        ❌        |               ❌              |   ✅   |
| private-hostbinding             |        ❌        |               ❌              |   ✅   |
| private-input                   |        ❌        |               ❌              |   ✅   |
| private-output                  |        ❌        |               ❌              |   ✅   |
| private-property                |        ❌        |               ❌              |   ✅   |
| private-viewchild               |        ❌        |               ❌              |   ✅   |
| service-with-generic-type-param |        ❌        |               ❌              |   ✅   |

## AoT Do's and Don'ts
This section explains the cases listed above, and will show how each of them fails and works.
### default-exports
Default exports are not supported with AoT.

Don't:
```ts
export default class AppComponent {};
```
Do:
```ts
export class AppComponent {};
```

### arrow-function-exports
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

### form-control

Use `this.helloForm.controls["greetingMessage"]` to retrieve form control is fine.

### form-control-error

The syntax `errors?` is not supported by AoT.

Don't:
```html
{{helloForm.controls["greetingMessage"].errors?.minlength}}
```
Do:
```html
{{helloForm.controls["greetingMessage"].hasError("minlength")}}
```

### func-as-variable-export

Export function as variable is fine with AoT except when it is passed to an NgModule.

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

### func-declaration-export

This is a fixed version of `func-as-variable-export`.

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
Do:

Apply `@angular/router` or other Angular logic to re-implement the same thing.

### func-in-providers
Pass a result of function to providers is not supported by AoT.

Don't:
```ts
//services/service-providers.ts
import { AppService } from "./app.service";
const services = {
  AppService: AppService
};

export function getService(k) {
  return services[k];
}
export const serviceProviders = Object.keys(services).map(getService);

//app.module.ts
import { serviceProviders } from "./services/service-providers";
@NgModule({
  //...
  providers: serviceProviders
})
export class AppModule {};
```
Do:
```ts
//services/service-providers.ts
import { AppService } from "./app.service";
const services = {
  AppService: AppService
};

export function getService(k) {
  return services[k];
}
export const serviceProviders = Object.keys(services).map(getService);

//app.module.ts
import { serviceProviders } from "./services/service-providers";
@NgModule({
  //...
  providers: serviceProviders
})
export class AppModule {};
```

### func-in-providers-useFactory
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

### func-in-providers-useValue

This case only fails when the passed value is generated by a nested function. If the foo inside `foo.ts` is not returning another function, then it will pass. Another solution is to replace useValue with useFactory and set it to use bar instead of barConst.

Don't:
```ts
//foo.ts
export function foo() { return function() { return {}; }; };
export const fooConst = foo();

//bar.ts
import { fooConst } from "./foo";
export function bar() { return fooConst(); }
export const barConst = bar();

//app.module.ts
//...
import { barConst } from "./bar";

@NgModule({
  //...
  providers: [ { provide: AppService, useValue: barConst }]
})
export class AppModule {};
```

Do:
```ts
//foo.ts
export function foo() { return {}; };
export const fooConst = foo();

//app.module.ts
//...
import { fooConst } from "./bar";

@NgModule({
  //...
  providers: [ { provide: AppService, useValue: fooConst }]
})
export class AppModule {};
```
or
```ts
//foo.ts
export function foo() { return function() { return {}; }; };
export function fooFactory() {
   return foo();
}
//app.module.ts
//...
import { fooFactory } from "./foo";

@NgModule({
  //...
  providers: [ { provide: AppService, useFactory: fooFactory }]
})
export class AppModule {};
```
### func-in-routes
Don't:
```ts
function random() {
  return [{
    path: "",
    component: AppViewComponent
  }];
}
const SAMPLE_APP_ROUTES: Routes = random();
```
Do:
```ts
const SAMPLE_APP_ROUTES: Routes = [{
  path: "",
  component: AppViewComponent
}];
```
or
```ts
import { random } from "./random.routes.ts";
const SAMPLE_APP_ROUTES: Routes = random();
```

### func-in-string-config
Function in string configuration is supported by AoT.

### interpolated-es6
Don't:
```ts
@Component({
  selector: "app",
  template: `Hello ${1 + 1}`
})
export class AppComponent {};
```
Do:
```ts
@Component({
  selector: "app",
  template: `Hello {{value}}`
})
export class AppComponent {
  value:number = 1 + 1;
};
```

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

### mut-property-decorator

Mutating property decorator is supported by `ngc`, but does not work with `@ngtools/webpack`, because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

Desired effect of this case is that `Hello World 42` instead of `Hello 42` should be displayed.
### ng2-redux

Setting up basic `ng2-redux` is fine with AoT.

### ng2-redux-@select
The `@select` decorator works with raw `ngc` compiler but not with `@ngtools/webpack` because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

In this test case, `@select() counter$: Observable<number>;` is used to get the counter observable so that we can access its value in the `AppComponent`.

### ngrx

Setting up basic `ng2-redux` is fine with AoT. But similar to `ng2-redux-@select`, `ngrx/Effects` does not work with `@ngtools/webpack`. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

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

### nomut-property-decorator

No-mutating property decorator is supported by `ngc`, but does not work with `@ngtools/webpack`, because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

Desired effect of this case is that console should raise errors because we are trying to change a `@ReadOnly` property.
### private-contentchild
Don't:
```ts
export class TabComponent {
  //...
  @ContentChildren(PaneDirective) private panes: QueryList<PaneDirective>;
  //...
}
```
Do:
```ts
export class TabComponent {
  //...
  /** @internal */
  @ContentChildren(PaneDirective) panes: QueryList<PaneDirective>;
  //...
}
```

### private-hostbinding
Don't:
```ts
export class NameDirective {
  @HostBinding("class.world") private isWorld: boolean = false;
}
```
Do:
```ts
export class NameDirective {
  /** @internal */
  @HostBinding("class.world") isWorld: boolean = false;
}
```

### private-input
Don't:
```ts
export class NameComponent {
 @Input() private name: String;
};
```
Do:
```ts
export class NameComponent {
  /** @internal */
 @Input() name: String;
};
```

### private-output
Don't:
```ts
export class NameComponent {
 @Output() private onClicked = new EventEmitter<boolean>();
 //...
};
```
Do:
```ts
export class NameComponent {
  /** @internal */
 @Output() onClicked = new EventEmitter<boolean>();
 //...
};
```

### private-property
Don't:
```ts
export class AppComponent {
  private name: string;
  constructor() {
    this.name = 'World';
  }
}
```
Do:
```ts
export class AppComponent {
  /** @internal */
  name: string;
  constructor() {
    this.name = 'World';
  }
}
```

### private-viewchild
Don't:
```ts
export class AppComponent implements AfterViewInit {
  @ViewChild(ChildDirective) private child: ChildDirective;

  ngAfterViewInit() {
    console.log(this.child.value);
  }
};
```
Do:
```ts
export class AppComponent implements AfterViewInit {
  /** @internal */
  @ViewChild(ChildDirective) child: ChildDirective;

  ngAfterViewInit() {
    console.log(this.child.value);
  }
};
```
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
### service-with-generic-type-param
Don't:
```ts
export class AppComponent {
  greeting: string;
  constructor(helloService: HelloService<boolean>) {
    this.greeting = helloService.getHello(true);
  }
};
```
The generic type parameter is not supported in Angular, and there is more [detail](https://github.com/angular/angular/issues/11057).
