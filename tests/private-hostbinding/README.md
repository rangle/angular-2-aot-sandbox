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
  /** @internal */
  @HostBinding("class.world") isWorld: boolean = false;
}
```
