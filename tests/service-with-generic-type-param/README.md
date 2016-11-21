### service-with-generic-type-param

The generic type parameter is not supported in Angular, and there is more [detail](https://github.com/angular/angular/issues/11057).

Don't:
```ts
export class AppComponent {
  greeting: string;
  constructor(helloService: HelloService<boolean>) {
    this.greeting = helloService.getHello(true);
  }
};
```
