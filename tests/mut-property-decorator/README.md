### mut-property-decorator

Mutating property decorator is supported by `ngc`, but does not work with `@ngtools/webpack`, because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

Desired effect of this case is that `Hello World 42` instead of `Hello 42` should be displayed.
