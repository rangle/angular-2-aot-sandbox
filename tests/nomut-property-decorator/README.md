### nomut-property-decorator

No-mutating property decorator is supported by `ngc`, but does not work with `@ngtools/webpack`, because `@ngtools/webpack` explicitly remove all custom decorators. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.

Desired effect of this case is that console should raise errors because we are trying to change a `@ReadOnly` property.
