export default function isEquipmentSlot(equipmentSlot: string): boolean {
  const allowedValues = [
    "hand",
    "offhand",
    "helmet",
    "chest",
    "gloves",
    "boots",
    "ring_1",
    "ring_2",
    "amulet",
    "belt",
  ];
  return allowedValues.includes(equipmentSlot);
}
