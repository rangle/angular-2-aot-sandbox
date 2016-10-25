# Angular 2 AoT SandBox
This repo is used to formalize what we can and cannot do with ngc.

To run specific test case like `control`:
```
node sanbox-loader.js control
```
and to turn off AoT:
```
node sanbox-loader.js control false
```
The bundle files are inside `./dist/`, and to host:
```
npm run start
```
## Current Status
[PASS] `control` <br/>
[PASS] `form-control` <br/>
[PASS] `template-variable` <br/>
[PASS] `template-expression` <br/>
[PASS] `mut-property-decorator` <br/>
[PASS] `nomut-property-decorator` <br/>
[FAILED] `default-exports` <br/>
[FAILED] `form-control-error` <br/>
[FAILED] `func-in-declarations` <br/>
[FAILED] `func-in-providers` <br/>
[FAILED] `func-in-routes` <br/>
[FAILED] `interpolated-es6` <br/>
[FAILED] `ng2-redux-@select` <br/>
[FAILED] `private-contentchild` <br/>
[FAILED] `private-hostbinding` <br/>
[FAILED] `private-input` <br/>
[FAILED] `private-output` <br/>
[FAILED] `private-viewchild` <br/>
[FAILED] `service-with-generic-type-param` <br/>
