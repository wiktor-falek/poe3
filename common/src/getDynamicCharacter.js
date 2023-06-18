"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicCharacter = void 0;
var characterClassAttributes_js_1 = require("./characterClassAttributes.js");
function getDynamicCharacter(character) {
  var baseAttributes = characterClassAttributes_js_1.characterClassAttributes[character.class];
  var attributes = __assign({}, baseAttributes); // calculate attributes
  var dynamicCharacter = __assign(__assign({}, character), {
    resistances: {
      fire: 0,
      cold: 0,
      lightning: 0,
      physical: 0,
      poison: 0,
    },
    attributes: attributes,
    resources: {
      maxHp: 10,
      hp: 10,
      maxMp: 10,
      mp: 5,
    },
  });
  return dynamicCharacter;
}
exports.getDynamicCharacter = getDynamicCharacter;
