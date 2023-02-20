import { RingBase } from "./bases";
import { IMPLICIT_MODIFIERS } from "./modifiers";
import util from "node:util";

function GoldRing() {
  return new RingBase(
    "Gold Ring",
    1,
    { level: 1 },
    [{ ...IMPLICIT_MODIFIERS.to_life }],
    []
  );
}
function SapphireRing() {
  return new RingBase(
    "Sapphire Ring",
    1,
    { level: 1 },
    [{ ...IMPLICIT_MODIFIERS.to_mana }],
    []
  );
}

const item = GoldRing().normalToMagicRarity();
console.log(util.inspect(item, false, null, true));
