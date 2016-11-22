### private-input

Don't:
```ts
export class NameComponent {
 @Input() private name: String;
};
```
Do:
```ts
export class NameComponent {
  /** @internal */
 @Input() name: String;
};
```
