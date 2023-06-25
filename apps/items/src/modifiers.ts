import { deepFreeze } from "./utils";

// IMPLICITS - can exist on any type of GearBase, regardless of rarity
export const IMPLICIT_MODIFIERS = deepFreeze({
  cold_damage_to_spells: {
    modId: "cold_damage_to_spells",
    description: "Adds # to # Cold Damage to Spells",
  },
  to_life: {
    modId: "to_life",
    description: "+# to Life",
  },
  to_mana: {
    modId: "to_mana",
    description: "+# to Mana",
  },
});

// BASE MODIFIERS - mods tied to the base, like critical strike chance on a weapon
export const BASE_MODIFIERS = deepFreeze({
  critical_strike_chance: {
    modId: "critical_strike_chance",
    description: "Critical Strike Chance: #%",
  },
  physical_damage: {
    modId: "physical_damage",
    description: "Physical Damage: #-#",
  },
  evasion: {
    modId: "evasion",
    description: "Evasion: #",
  },
  armor: {
    modId: "armor",
    description: "Armor: #",
  },
});

// AFFIXES
//   0 prefixes and   0 suffixex on normal rarity item,
// 1-2 prefixes and 1-2 suffixes on magic rarity item,
// 2-3 prefixes and 2-3 suffixes on rare rarity item,

export const PREFIX_MODIFIERS = deepFreeze({
  to_life: {
    modId: "to_life",
    description: "+# to Life",
    tiers: [
      { tier: 10, range: [3, 5], ilvl: 1 },
      { tier: 9, range: [6, 9], ilvl: 10 },
      { tier: 8, range: [10, 16], ilvl: 20 },
    ],
  },
  to_mana: {
    modId: "to_mana",
    description: "+# to Mana",
    tiers: [
      { tier: 10, range: [3, 5], ilvl: 1 },
      { tier: 9, range: [6, 9], ilvl: 10 },
      { tier: 8, range: [10, 16], ilvl: 20 },
    ],
  },
  to_life_regeneration: {
    modId: "to_life_regeneration",
    description: "+# to Life Regeneration",
    tiers: [
      { tier: 10, range: [1, 1], ilvl: 1 },
      { tier: 9, range: [1, 2], ilvl: 10 },
      { tier: 8, range: [2, 3], ilvl: 20 },
    ],
  },
  to_mana_regeneration: {
    modId: "to_mana_regeneration",
    description: "+# to Mana Regeneration",
    tiers: [
      { tier: 10, range: [1, 1], ilvl: 1 },
      { tier: 9, range: [1, 2], ilvl: 10 },
      { tier: 8, range: [2, 3], ilvl: 20 },
    ],
  },
  to_armor: {
    modId: "to_armor",
    description: "+# to Armor",
    tiers: [
      { tier: 10, range: [4, 5], ilvl: 1 },
      { tier: 9, range: [7, 10], ilvl: 10 },
      { tier: 8, range: [10, 16], ilvl: 20 },
    ],
  },
  to_evasion: {
    modId: "to_evasion",
    description: "+# to Evasion",
    tiers: [
      { tier: 10, range: [4, 5], ilvl: 1 },
      { tier: 9, range: [7, 10], ilvl: 10 },
      { tier: 8, range: [10, 16], ilvl: 20 },
    ],
  },
  // to_physical_damage: {
  //   modId: "to_physical_damage",
  //   description: "Adds # to # Physical Damage"
  // },
  // increased_physical_damage: {
  //   modId: "increased_physical_damage",
  //   description: "#% Increased Physical Damage"
  // },
});

export const SUFFIX_MODIFIERS = deepFreeze({
  to_strength: {
    modId: "to_strength",
    description: "+# to Strength",
    tiers: [
      { tier: 10, range: [1, 2], ilvl: 1 },
      { tier: 9, range: [2, 3], ilvl: 10 },
      { tier: 8, range: [3, 4], ilvl: 20 },
    ],
  },
  to_dexterity: {
    modId: "to_dexterity",
    description: "+# to Dexterity",
    tiers: [
      { tier: 10, range: [1, 2], ilvl: 1 },
      { tier: 9, range: [2, 3], ilvl: 10 },
      { tier: 8, range: [3, 4], ilvl: 20 },
    ],
  },
  to_intelligence: {
    modId: "to_intelligence",
    description: "+# to Intelligence",
    tiers: [
      { tier: 10, range: [1, 2], ilvl: 1 },
      { tier: 9, range: [2, 3], ilvl: 10 },
      { tier: 8, range: [3, 4], ilvl: 20 },
    ],
  },
  to_vitality: {
    modId: "to_vitality",
    description: "+# to Vitality",
    tiers: [
      { tier: 10, range: [1, 2], ilvl: 1 },
      { tier: 9, range: [2, 3], ilvl: 10 },
      { tier: 8, range: [3, 4], ilvl: 20 },
    ],
  },
  to_speed: {
    modId: "to_speed",
    description: "+# to Speed",
    tiers: [
      { tier: 10, range: [1, 2], ilvl: 1 },
      { tier: 9, range: [2, 3], ilvl: 10 },
      { tier: 8, range: [3, 4], ilvl: 20 },
    ],
  },
  to_fire_resistance: {
    modId: "to_fire_resistance",
    description: "+#% to Fire Resistance",
    tiers: [
      { tier: 10, range: [3, 4], ilvl: 1 },
      { tier: 9, range: [4, 5], ilvl: 10 },
      { tier: 8, range: [5, 7], ilvl: 20 },
    ],
  },
  to_cold_resistance: {
    modId: "to_cold_resistance",
    description: "+#% to Cold Resistance",
    tiers: [
      { tier: 10, range: [3, 4], ilvl: 1 },
      { tier: 9, range: [4, 5], ilvl: 10 },
      { tier: 8, range: [5, 7], ilvl: 20 },
    ],
  },
  to_lightning_resistance: {
    modId: "to_lightning_resistance",
    description: "+#% to Lightning Resistance",
    tiers: [
      { tier: 10, range: [3, 4], ilvl: 1 },
      { tier: 9, range: [4, 5], ilvl: 10 },
      { tier: 8, range: [5, 7], ilvl: 20 },
    ],
  },
});
