### interpolated-es6

Don't:
```ts
@Component({
  selector: "app",
  template: `Hello ${1 + 1}`
})
export class AppComponent {};
```
Do:
```ts
@Component({
  selector: "app",
  template: `Hello {{value}}`
})
export class AppComponent {
  value:number = 1 + 1;
};
```
