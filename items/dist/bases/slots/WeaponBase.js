"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _WeaponBase_PREFIX_MODIFIER_POOL, _WeaponBase_SUFFIX_MODIFIER_POOL;
Object.defineProperty(exports, "__esModule", { value: true });
const GearBase_1 = __importDefault(require("../GearBase"));
class WeaponBase extends GearBase_1.default {
    constructor(name, ilvl, requirements, baseMods, implicits) {
        super(name, ilvl, requirements, baseMods, implicits);
        _WeaponBase_PREFIX_MODIFIER_POOL.set(this, []);
        _WeaponBase_SUFFIX_MODIFIER_POOL.set(this, []);
        this.slot = "hand";
    }
}
_WeaponBase_PREFIX_MODIFIER_POOL = new WeakMap(), _WeaponBase_SUFFIX_MODIFIER_POOL = new WeakMap();
exports.default = WeaponBase;
