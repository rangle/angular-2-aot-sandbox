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
  /** @internal */
  @ContentChildren(PaneDirective) panes: QueryList<PaneDirective>;
  //...
}
```
