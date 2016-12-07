# Angular 2 AoT SandBox
This repo is used to formalize what we can and cannot do with AoT (through `ngc` or `@ngtools/webpack`).

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

|                                  Test                                  |  AoT With `ngc`  |  AoT With `@ngtools/webpack`  |  JiT  |
| ---------------------------------------------------------------------- | :--------------: | :---------------------------: | :---: |
| [control](#control-top)                                                |        ✅        |               ✅              |   ✅   |
| [form-control](#form-control-top)                                      |        ✅        |               ✅              |   ✅   |
| [func-in-string-config](#func-in-string-config-top)                    |        ✅        |               ✅              |   ✅   |
| [jquery](#jquery-top)                                                  |        ✅        |               ✅              |   ✅   |
| [template-variable](#template-variable-top)                            |        ✅        |               ✅              |   ✅   |
| [template-expression](#template-expression-top)                        |        ✅        |               ✅              |   ✅   |
| [mut-property-decorator](#mut-property-decorator-top)                  |        ✅        |               ❌              |   ✅   |
| [nomut-property-decorator](#nomut-property-decorator-top)              |        ✅        |               ❌              |   ✅   |
| [ng2-redux](#ng2-redux-top)                                            |        ✅        |               ✅              |   ✅   |
| [ng2-redux-@select](#ng2-redux-select-top)                             |        ✅        |               ❌              |   ✅   |
| [ngrx](#ngrx-top)                                                      |        ✅        |               ✅              |   ✅   |
| [ngrx-effects](#ngrx-effects-top)                                      |        ✅        |               ❌              |   ✅   |
| [ngrx-compose](#ngrx-compose-top)                                      |        ✅        |               ✅              |   ✅   |
| [arrow-function-exports](#arrow-function-exports-top)                  |        ❌        |               ❌              |   ✅   |
| [default-exports](#default-exports-top)                                |        ❌        |               ❌              |   ✅   |
| [form-control-error](#form-control-error-top)                          |        ❌        |               ❌              |   ✅   |
| [func-as-variable-export](#func-as-variable-export-top)                |        ❌        |               ❌              |   ✅   |
| [func-declaration-export](#func-declaration-export-top)                |        ✅        |               ✅              |   ✅   |
| [func-in-declarations](#func-in-declarations-top)                      |        ❌        |               ❌              |   ✅   |
| [func-in-providers](#func-in-providers-top)                            |        ❌        |               ❌              |   ✅   |
| [func-in-providers-useFactory](#func-in-providers-usefactory-top)      |        ❌        |               ❌              |   ✅   |
| [func-in-providers-useValue](#func-in-providers-usevalue-top)          |        ❌        |               ❌              |   ✅   |
| [func-in-routes](#func-in-routes-top)                                  |        ❌        |               ❌              |   ✅   |
| [interpolated-es6](#interpolated-es6-top)                              |        ❌        |               ❌              |   ✅   |
| [property-accessors](#property-accessors-top)                          |        ❌        |               ❌              |   ✅   |
| [private-contentchild](#private-contentchild-top)                      |        ❌        |               ❌              |   ✅   |
| [private-hostbinding](#private-hostbinding-top)                        |        ❌        |               ❌              |   ✅   |
| [private-input](#private-input-top)                                    |        ❌        |               ❌              |   ✅   |
| [private-output](#private-output-top)                                  |        ❌        |               ❌              |   ✅   |
| [private-property](#private-property-top)                              |        ❌        |               ❌              |   ✅   |
| [private-viewchild](#private-viewchild-top)                            |        ❌        |               ❌              |   ✅   |
| [service-with-generic-type-param](#service-with-generic-type-param-top)|        ❌        |               ❌              |   ✅   |

## AoT Do's and Don'ts
This section explains the cases listed above, and will show how each of them fails and works.

### arrow-function-exports [:top:](#current-status)

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

### control [:top:](#current-status)

This is used as a simplest working case.

### default-exports [:top:](#current-status)
Default exports are not supported with AoT.

Don't:
```ts
export default class AppComponent {};
```
Do:
```ts
export class AppComponent {};
```

### form-control [:top:](#current-status)

Use `this.helloForm.controls["greetingMessage"]` to retrieve form control is fine.

### form-control-error [:top:](#current-status)

The syntax `errors?` is not supported by AoT.

Don't:
```html
{{helloForm.controls["greetingMessage"].errors?.minlength}}
```
Do:
```html
{{helloForm.controls["greetingMessage"].hasError("minlength")}}
```

### func-as-variable-export [:top:](#current-status)

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

### func-declaration-export [:top:](#current-status)

This is a fixed version of `func-as-variable-export`.

### func-in-declarations [:top:](#current-status)
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

### func-in-providers [:top:](#current-status)
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
export const serviceProviders = [
  AppService
];

//app.module.ts
import { serviceProviders } from "./services/service-providers";
@NgModule({
  //...
  providers: serviceProviders
})
export class AppModule {};
```

### func-in-providers-useFactory [:top:](#current-status)

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

### func-in-providers-useValue [:top:](#current-status)

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
### func-in-routes [:top:](#current-status)

Direct use of function in route is not supported by AoT. Either avoid using it or export it from other module.

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

### func-in-string-config [:top:](#current-status)

Function in string configuration is supported by AoT.

### interpolated-es6 [:top:](#current-status)

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

### jquery [:top:](#current-status)

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

### mut-property-decorator [:top:](#current-status)

Mutating property decorator is supported by `ngc`, but does not work with `@ngtools/webpack`, because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

Desired effect of this case is that `Hello World 42` instead of `Hello 42` should be displayed.
### ng2-redux [:top:](#current-status)

Setting up basic `ng2-redux` is fine with AoT.

### ng2-redux-@select [:top:](#current-status)
The `@select` decorator works with raw `ngc` compiler but not with `@ngtools/webpack` because `@ngtools/webpack` explicitly remove all custom decorators. See [here](https://github.com/angular-redux/ng2-redux/issues/236) and [here](https://github.com/angular/angular-cli/issues/2799) for more information.

In this test case, `@select() counter$: Observable<number>;` is used to get the counter observable so that we can access its value in the `AppComponent`.

### ngrx [:top:](#current-status)

Setting up basic `ngrx` is fine with AoT.

### ngrx-effects [:top:](#current-status)

Setting up basic `ngrx-effects` is fine with AoT. But similar to `ng2-redux-@select`, `ngrx/Effects` does not work with `@ngtools/webpack`, due to custom decorators being stripped. See [here](https://github.com/angular-redux/ng2-redux/issues/236) and [here](https://github.com/angular/angular-cli/issues/2799) for more information.

### ngrx-compose [:top:](#current-status)

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

### nomut-property-decorator [:top:](#current-status)

No-mutating property decorator is supported by `ngc`, but does not work with `@ngtools/webpack`, because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

Desired effect of this case is that console should raise errors because we are trying to change a `@ReadOnly` property.
### private-contentchild [:top:](#current-status)

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

### private-hostbinding [:top:](#current-status)

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

### private-input [:top:](#current-status)

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

### private-output [:top:](#current-status)

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

### private-property [:top:](#current-status)

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

### private-viewchild [:top:](#current-status)

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
### property-accessors [:top:](#current-status)

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
### service-with-generic-type-param [:top:](#current-status)
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

### template-expression [:top:](#current-status)

Assign expression like `greeting + answer` to `template` is supported by AoT.

### template-variable [:top:](#current-status)

Assign variable like `greeting` to `template` is supported by AoT.
