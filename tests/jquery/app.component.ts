import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: "app",
  template: `<h1 class="world"> Hello World </h1>`
})
export class AppComponent implements OnInit {
  $: any;
  constructor(@Inject("JqueryService") jquery) {
    this.$ = jquery;
  }
  ngOnInit() {
    console.log(this.$);
    console.log(this.$("h1.world").html());
    this.$("h1.world").html("jQuery works!");
  }
};
