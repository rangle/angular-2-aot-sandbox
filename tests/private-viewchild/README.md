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
