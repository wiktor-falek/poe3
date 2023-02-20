"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _RingBase_PREFIX_MODIFIER_POOL, _RingBase_SUFFIX_MODIFIER_POOL;
Object.defineProperty(exports, "__esModule", { value: true });
const modifiers_1 = require("../../modifiers");
const utils_1 = require("../../utils");
const GearBase_1 = __importDefault(require("../GearBase"));
class RingBase extends GearBase_1.default {
    constructor(name, ilvl, requirements, baseMods, implicits) {
        super(name, ilvl, requirements, baseMods, implicits);
        _RingBase_PREFIX_MODIFIER_POOL.set(this, (0, utils_1.deepFreeze)([
            Object.assign(Object.assign({}, modifiers_1.PREFIX_MODIFIERS.to_life), { weight: 1000 }),
            Object.assign(Object.assign({}, modifiers_1.PREFIX_MODIFIERS.to_mana), { weight: 1000 }),
        ]));
        _RingBase_SUFFIX_MODIFIER_POOL.set(this, (0, utils_1.deepFreeze)([
            Object.assign(Object.assign({}, modifiers_1.SUFFIX_MODIFIERS.to_strength), { weight: 1000 }),
            Object.assign(Object.assign({}, modifiers_1.SUFFIX_MODIFIERS.to_dexterity), { weight: 1000 }),
            Object.assign(Object.assign({}, modifiers_1.SUFFIX_MODIFIERS.to_intelligence), { weight: 1000 }),
            Object.assign(Object.assign({}, modifiers_1.SUFFIX_MODIFIERS.to_vitality), { weight: 1000 }),
            Object.assign(Object.assign({}, modifiers_1.SUFFIX_MODIFIERS.to_speed), { weight: 1000 }),
        ]));
        this.slot = "ring";
    }
    magic() {
        return super.magic(__classPrivateFieldGet(this, _RingBase_PREFIX_MODIFIER_POOL, "f"), __classPrivateFieldGet(this, _RingBase_SUFFIX_MODIFIER_POOL, "f"));
    }
}
_RingBase_PREFIX_MODIFIER_POOL = new WeakMap(), _RingBase_SUFFIX_MODIFIER_POOL = new WeakMap();
exports.default = RingBase;
