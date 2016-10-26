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

| Test | Status |
| --- | --- |
| control | ✅ |
| form-control | ✅ |
| func-in-string-config | ✅ |
| template-variable | ✅ |
| template-expression | ✅ |
| mut-property-decorator | ✅ |  
| nomut-property-decorator | ✅ |
| default-exports | ❌ |
| form-control-error | ❌ |
| func-in-declarations| ❌ |
| func-in-providers | ❌ |
| func-in-routes | ❌ |
| interpolated-es6 | ❌ |
| ng2-redux-@select ([related discussion](https://github.com/angular-redux/ng2-redux/issues/236)) | ❌ |
| private-contentchild | ❌ |
| private-hostbinding | ❌ |
| private-input | ❌ |
| private-output | ❌ |  
| private-property | ❌ |
| private-viewchild | ❌ |
| service-with-generic-type-param | ❌ |
