"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = exports.deepFreeze = void 0;
const node_util_1 = __importDefault(require("node:util"));
function deepFreeze(obj) {
    Object.keys(obj).forEach((prop) => {
        if (typeof obj[prop] === "object" && !Object.isFrozen(obj[prop]))
            deepFreeze(obj[prop]);
    });
    return Object.freeze(obj);
}
exports.deepFreeze = deepFreeze;
function inspect(obj) {
    return node_util_1.default.inspect(obj, false, null, true);
}
exports.inspect = inspect;
