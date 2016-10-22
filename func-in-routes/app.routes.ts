import { Routes, RouterModule } from "@angular/router";
import { AppViewComponent } from "./app-view.component";

function random() {
  return [{
    path: "",
    component: AppViewComponent
  }];
}
const SAMPLE_APP_ROUTES: Routes = random();

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(SAMPLE_APP_ROUTES);
