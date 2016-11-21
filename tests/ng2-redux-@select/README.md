### ng2-redux-@select
The `@select` decorator with raw `ngc` compiler but not with `@ngtools/webpack` because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

In this test case, `@select() counter$: Observable<number>;` is used to get the counter observable so that we can access its value in the `AppComponent`.
