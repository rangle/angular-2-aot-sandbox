# Angular 2 AoT SandBox
This repo is used to formalize what we can and cannot do with ngc.

This repo should be:
- is easy to maintain, no webpack necessary, just `tsc`/`ngc` is fine
- has a "control" case or "happy path" where we can run ngc on "hello world" and build/measure a build copy
- has cases for each individual expression or code composition that breaks `ngc`
- can run all the cases and produce a simple pass/fail output
- has some sort of simple "harness" for loading the JiT copy of each case
- has some sort of simple "harness" for running the AoT copy of each case

## Cases
- property decorator (non-mutating)
- property decorator (mutating)
- variable instead of string literal for `@Component`'s template field
- expression instead of string literal for `@Component`'s template field
- interpolated ES6(`${variable}`) in a `@Component`'s template field

## Current Status
[PASS] `control` <br/>
[PASS] `form-control` <br/>
[PASS] `template-variable` <br/>
[PASS] `template-expression` <br/>

[FAILED] `default-exports` <br/>
[FAILED] `form-control-error` <br/>
[FAILED] `func-in-declarations` <br/>
[FAILED] `func-in-providers` <br/>
[FAILED] `func-in-routes` <br/>
[FAILED] `interpolated-es6` <br/>
[FAILED] `private-contentchild` <br/>
[FAILED] `private-hostbinding` <br/>
[FAILED] `private-input` <br/>
[FAILED] `private-output` <br/>
[FAILED] `private-viewchild` <br/>
[FAILED] `service-with-generic-type-param` <br/>
