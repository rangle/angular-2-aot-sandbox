###func-in-providers

Pass a value returned by function to providers is not supported by AoT.

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
