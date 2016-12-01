### ngrx-effects

Setting up basic `ngrx-effects` is fine with AoT. But similar to `ng2-redux-@select`, `ngrx/Effects` does not work with `@ngtools/webpack`, due to custom decorators being stripped. Details can be found here: https://github.com/angular-redux/ng2-redux/issues/236.
