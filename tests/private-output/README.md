### private-output

Don't:
```ts
export class NameComponent {
 @Output() private onClicked = new EventEmitter<boolean>();
 //...
};
```
Do:
```ts
export class NameComponent {
  /** @internal */
 @Output() onClicked = new EventEmitter<boolean>();
 //...
};
```
