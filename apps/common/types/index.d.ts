// export type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

// export interface Attributes {
//   strength: number;
//   dexterity: number;
//   intelligence: number;
//   vitality: number;
//   speed: number;
// }

// interface Resistances {
//   fire: number;
//   cold: number;
//   lightning: number;
//   poison: number;
// }

// interface Resources {
//   hp: number;
//   maxHp: number;
//   mp: number;
//   maxMp: number;
//   ap: number;
//   maxAp: number;
// }

// type EquipmentSlot =
//   | "hand"
//   | "offhand"
//   | "helmet"
//   | "chest"
//   | "gloves"
//   | "boots"
//   | "ring_1"
//   | "ring_2"
//   | "amulet"
//   | "belt";

// // interface Item {}

// // interface EquipmentBase {}

// // interface CharacterEquipment {
// //   hand: EquipmentBase;
// //   offhand: EquipmentBase;
// //   helmet: EquipmentBase;
// //   chest: EquipmentBase;
// //   gloves: EquipmentBase;
// //   boots: EquipmentBase;
// //   ring_1: EquipmentBase;
// //   ring_2: EquipmentBase;
// //   amulet: EquipmentBase;
// //   belt: EquipmentBase;
// // }

// interface Level {
//   value: number;
//   xp: number;
//   requiredXp: number;
// }

// interface CharacterProgression {
//   mainStory: {
//     highestZoneId: number;
//   };
// }

// // character data from the database
// interface StaticCharacter {
//   userId: string;
//   name: string;
//   class: CharacterClass;
//   silver: number;
//   level: Level;
//   equipment: undefined;
//   inventory: Array<undefined>;
//   progression: CharacterProgression;
// }

// interface User {
//   account: {
//     username: string;
//     email: string;
//     hasConfirmedEmail: boolean;
//     registrationTimestamp: number;
//     sessionId: string;
//     characterLimit: number;
//     hash: string;
//   };
//   sharedStash: Array<null>;
//   characters: Array<StaticCharacter>; // WithId<StaticCharacter> but whatever for now
// }

// // character data that gets extended with properties that are dynamically calculated
// // for example attributes need to be calculated by the base values of the class + all attributes on equipped gear etc
// interface DynamicCharacter extends StaticCharacter {
//   resistances: Resistances;
//   attributes: Attributes;
//   resources: Resources;
// }
