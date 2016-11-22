### form-control-error

The syntax `errors?` is not supported by AoT.

Don't:
```html
{{helloForm.controls["greetingMessage"].errors?.minlength}}
```
Do:
```html
{{helloForm.controls["greetingMessage"].hasError("minlength")}}
```
