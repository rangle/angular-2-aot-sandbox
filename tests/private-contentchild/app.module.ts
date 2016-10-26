import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TabComponent } from "./tab.component";
import { PaneDirective } from "./pane.directive";

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    TabComponent,
    PaneDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
