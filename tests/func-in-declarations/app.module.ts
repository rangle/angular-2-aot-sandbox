import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppFakeComponent } from "./app-fake.component";

let fakeWorld = true;
function someLoader(someVariable: boolean) {
  if (someVariable) {
    return [ AppFakeComponent ];
  } else {
    return [ AppComponent ];
  }
}

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: someLoader(fakeWorld),
  bootstrap: someLoader(fakeWorld)
})
export class AppModule {};
