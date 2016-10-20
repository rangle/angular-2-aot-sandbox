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
