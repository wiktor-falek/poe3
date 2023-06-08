import util from "node:util";

export function deepFreeze(obj: any) {
  Object.keys(obj).forEach((prop: any) => {
    if (typeof obj[prop] === "object" && !Object.isFrozen(obj[prop])) deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
}

export function inspect(obj: any) {
  return util.inspect(obj, false, null, true);
}
