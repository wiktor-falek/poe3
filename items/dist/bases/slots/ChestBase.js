"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ChestBase_PREFIX_MODIFIER_POOL, _ChestBase_SUFFIX_MODIFIER_POOL;
Object.defineProperty(exports, "__esModule", { value: true });
const GearBase_1 = __importDefault(require("../GearBase"));
class ChestBase extends GearBase_1.default {
    constructor(name, ilvl, requirements, baseMods, implicits) {
        super(name, ilvl, requirements, baseMods, implicits);
        _ChestBase_PREFIX_MODIFIER_POOL.set(this, []);
        _ChestBase_SUFFIX_MODIFIER_POOL.set(this, []);
        this.slot = "chest";
    }
}
_ChestBase_PREFIX_MODIFIER_POOL = new WeakMap(), _ChestBase_SUFFIX_MODIFIER_POOL = new WeakMap();
exports.default = ChestBase;
