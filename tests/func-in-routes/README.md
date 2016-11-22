### func-in-routes

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
