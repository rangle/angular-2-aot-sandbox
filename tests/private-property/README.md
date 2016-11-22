### private-property

Don't:
```ts
export class AppComponent {
  private name: string;
  constructor() {
    this.name = 'World';
  }
}
```
Do:
```ts
export class AppComponent {
  /** @internal */
  name: string;
  constructor() {
    this.name = 'World';
  }
}
```
