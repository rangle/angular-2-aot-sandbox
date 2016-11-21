import { ERROR, WARNING } from "./definitions";

export function handler1() {};
export function handler2() {};

export const ErrorEventHandlers = {
  [ERROR]: {
    handler: handler1
  },
  [WARNING]: {
    handler: handler2
  }
};
