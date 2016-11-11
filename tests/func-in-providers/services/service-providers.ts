import { AppService } from "./app.service";
const services = {
  AppService: AppService
};

export function getService(k) {
  return services[k];
}
export const serviceProviders = Object.keys(services).map(getService);
