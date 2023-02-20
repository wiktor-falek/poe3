"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bases_1 = require("./bases");
const modifiers_1 = require("./modifiers");
const node_util_1 = __importDefault(require("node:util"));
function GoldRing() {
    return new bases_1.RingBase("Gold Ring", 1, { level: 1 }, [Object.assign({}, modifiers_1.IMPLICIT_MODIFIERS.to_life)], []);
}
function SapphireRing() {
    return new bases_1.RingBase("Sapphire Ring", 1, { level: 1 }, [Object.assign({}, modifiers_1.IMPLICIT_MODIFIERS.to_mana)], []);
}
const item = GoldRing().normalToMagicRarity();
console.log(node_util_1.default.inspect(item, false, null, true));
