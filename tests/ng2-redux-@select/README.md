### ng2-redux-@select
The `@select` decorator works with raw `ngc` compiler but not with `@ngtools/webpack` because `@ngtools/webpack` explicitly remove all custom decorators. See [here](https://github.com/angular-redux/ng2-redux/issues/236) and [here](https://github.com/angular/angular-cli/issues/2799) for more information.

In this test case, `@select() counter$: Observable<number>;` is used to get the counter observable so that we can access its value in the `AppComponent`.
