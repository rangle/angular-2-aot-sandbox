import { fooConst } from "./foo";

export function bar() {
    return fooConst();
}

export const barConst = bar();
