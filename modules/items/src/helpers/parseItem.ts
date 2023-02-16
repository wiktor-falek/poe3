import { RingBase } from "../gear/bases";

/**
 * Parses item object and returns a class instance corresponding to the items slot property
 */
export default function parseItem(item: any): string | null {
  const slot = item?.slot;
  if (slot == null || typeof slot !== "string") {
    return null;
  }
  switch (slot) {
    case "ring":
      return "RingBase";
    default:
      break;
  }

  return null;
}
