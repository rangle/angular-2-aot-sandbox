export function foo() { return function() { return {}; }; };

export const fooConst = foo();
