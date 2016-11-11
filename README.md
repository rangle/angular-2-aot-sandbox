# Angular 2 AoT SandBox
This repo is used to formalize what we can and cannot do with ngc.

To run specific test case like `control`:
```
node sandbox-loader.js control
```
and to turn off AoT:
```
node sandbox-loader.js control false
```
The bundle files are inside `./dist/`, and to host:
```
npm run start
```
## Current Status

| Test | Status | Issue |
| --- | --- | --- |
| control | ✅ | N/A |
| form-control | ✅ | N/A |
| func-in-string-config | ✅ | N/A |
| template-variable | ✅ | N/A |
| template-expression | ✅ | N/A |
| mut-property-decorator | ✅ | N/A |
| nomut-property-decorator | ✅ | N/A |
| ng2-redux | ✅ | N/A |
| ng2-redux-@select | ✅ (but not with `@ngtools/webpack` or the Angular-CLI: [related discussion](https://github.com/angular-redux/ng2-redux/issues/236)) | N/A |
| ngrx | ✅ (but not `ngrx/Effects` with `@ngtools/webpack` or the Angular-CLI: same issue as above). | N/A |
| ngrx-compose | ✅ (Requires some work, please look into the `tests/ngrx-compose/reducers/index.ts`) | N/A |
| arrow-function-exports | ❌ |
| default-exports | ❌ | [issue](https://github.com/angular/angular/issues/11402) |
| form-control-error | ❌ |
| func-in-declarations| ❌ |
| func-in-providers | ❌ |
| func-in-providers-useFactory | ❌ |
| func-in-routes | ❌ |
| interpolated-es6 | ❌ |
| nested-function | ❌ |
| property-accessors | ❌ |
| private-contentchild | ❌ |
| private-hostbinding | ❌ |
| private-input | ❌ |
| private-output | ❌ |  
| private-property | ❌ |
| private-viewchild | ❌ |
| service-with-generic-type-param | ❌ |

## AoT Do's and Don'ts
### default-exports
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

### form-control-error
Don't:
```html
{{helloForm.controls["greetingMessage"].errors?.minlength}}
```
Do:
```html
{{helloForm.controls["greetingMessage"].hasError("minlength")}}
```
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

### ng2-redux-@select
Using ng2-redux's `@select` is actually not a problem of `ngc` and more details [here](https://github.com/angular-redux/ng2-redux/issues/236).

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
  @ViewChild(ChildDirective) child: ChildDirective;

  ngAfterViewInit() {
    console.log(this.child.value);
  }
};
```
### property-accessors
Don't:
```ts
import { ERROR, WARNING } from "./definitions";

export const ErrorEventHandlers = {
  [ERROR]: {
    handler: function() {}
  },
  [WARNING]: {
    handler: function() {}
  }
};
```
Do:
```ts
export const ErrorEventHandlers = {
  'ERROR': {
    handler: function() {}
  },
  'WARNING': {
    handler: function() {}
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
