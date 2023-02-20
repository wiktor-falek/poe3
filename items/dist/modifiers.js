"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUFFIX_MODIFIERS = exports.PREFIX_MODIFIERS = exports.BASE_MODIFIERS = exports.IMPLICIT_MODIFIERS = void 0;
// IMPLICITS - can exist on any type of GearBase, regardless of rarity
exports.IMPLICIT_MODIFIERS = {
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
};
// BASE MODIFIERS - mods tied to the base, like critical strike chance on a weapon
exports.BASE_MODIFIERS = {
    critical_strike_chance: {
        modId: "critical_strike_chance",
        description: "Critical Strike Chance: #%",
    },
    physical_damage: {
        modId: "physical_damage",
        description: "Physical Damage: # to #",
    },
    evasion: {
        modId: "evasion",
        description: "Evasion: #",
    },
    armor: {
        modId: "armor",
        description: "Armor: #",
    },
};
// AFFIXES
//   0 prefixes and   0 suffixex on normal rarity item,
// 1-2 prefixes and 1-2 suffixes on magic rarity item,
// 2-3 prefixes and 2-3 suffixes on rare rarity item,
exports.PREFIX_MODIFIERS = {
    to_life: {
        modId: "to_life",
        description: "+# to Life",
        tiers: {
            10: { range: [1, 2], ilvl: 1 },
            9: { range: [3, 5], ilvl: 10 },
            8: { range: [6, 9], ilvl: 20 },
        },
    },
    to_mana: {
        modId: "to_mana",
        description: "+# to Mana",
        tiers: {
            10: { range: [2, 3], ilvl: 1 },
            9: { range: [4, 6], ilvl: 10 },
            8: { range: [7, 10], ilvl: 20 },
        },
    },
};
exports.SUFFIX_MODIFIERS = {
    to_strength: {
        modId: "to_strength",
        description: "+# to Strength",
        tiers: {
            10: { range: [1, 2], ilvl: 1 },
            9: { range: [2, 3], ilvl: 10 },
            8: { range: [3, 4], ilvl: 20 },
        },
    },
    to_dexterity: {
        modId: "to_dexterity",
        description: "+# to Dexterity",
        tiers: {
            10: { range: [1, 2], ilvl: 1 },
            9: { range: [2, 3], ilvl: 10 },
            8: { range: [3, 4], ilvl: 20 },
        },
    },
    to_intelligence: {
        modId: "to_intelligence",
        description: "+# to Intelligence",
        tiers: {
            10: { range: [1, 2], ilvl: 1 },
            9: { range: [2, 3], ilvl: 10 },
            8: { range: [3, 4], ilvl: 20 },
        },
    },
    to_vitality: {
        modId: "to_vitality",
        description: "+# to Vitality",
        tiers: {
            10: { range: [1, 2], ilvl: 1 },
            9: { range: [2, 3], ilvl: 10 },
            8: { range: [3, 4], ilvl: 20 },
        },
    },
    to_speed: {
        modId: "to_speed",
        description: "+# to Speed",
        tiers: {
            10: { range: [1, 2], ilvl: 1 },
            9: { range: [2, 3], ilvl: 10 },
            8: { range: [3, 4], ilvl: 20 },
        },
    },
};
