import { TABLE_NAMES, TABLE_NAMES_LIST } from "./tables";

export const PRESETS = {
  "": [],
  ALL: TABLE_NAMES_LIST,
  CHARACTER: [
    TABLE_NAMES.CHARACTER_SEX,
    TABLE_NAMES.CHARACTER_RACE,
    TABLE_NAMES.CHARACTER_APPEARANCE,
    TABLE_NAMES.CHARACTER_PHYSICAL_DETAIL,
    TABLE_NAMES.CHARACTER_CLOTHES,
    TABLE_NAMES.CHARACTER_PERSONALITY,
    TABLE_NAMES.CHARACTER_MANNERISM,
  ],
  NAMES: [
    TABLE_NAMES.NAME_MALE_NAME,
    TABLE_NAMES.NAME_FEMALE_NAME,
    TABLE_NAMES.NAME_UPPER_CLASS_LAST_NAME,
    TABLE_NAMES.NAME_LOWER_CLASS_LAST_NAME,
    TABLE_NAMES.NAME_NICKNAME,
    TABLE_NAMES.MONSTER_AERIAL_FORM,
    TABLE_NAMES.MONSTER_TERRESTRIAL_FORM,
    TABLE_NAMES.MONSTER_AQUATIC_FORM,
    TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS,
    TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS,
  ],
  MONSTER: [
    TABLE_NAMES.MONSTER_TYPE,
    TABLE_NAMES.MONSTER_AERIAL_FORM,
    TABLE_NAMES.MONSTER_TERRESTRIAL_FORM,
    TABLE_NAMES.MONSTER_AQUATIC_FORM,
    TABLE_NAMES.MONSTER_FEATURES,
    TABLE_NAMES.MONSTER_TRAITS,
    TABLE_NAMES.MONSTER_ABILITIES,
    TABLE_NAMES.MONSTER_TACTICS,
    TABLE_NAMES.MONSTER_PERSONALITY,
    TABLE_NAMES.MONSTER_WEAKNESS,
    TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS,
    TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS,
    TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS,
    TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS,
  ],
  NPC: [
    TABLE_NAMES.NPC_OCCUPATION_CIVILIZATION,
    TABLE_NAMES.NPC_OCCUPATION_UNDERWORLD,
    TABLE_NAMES.NPC_OCCUPATION_WILDERNESS,
    TABLE_NAMES.NAME_MALE_NAME,
    TABLE_NAMES.NAME_FEMALE_NAME,
    TABLE_NAMES.NAME_UPPER_CLASS_LAST_NAME,
    TABLE_NAMES.NAME_LOWER_CLASS_LAST_NAME,
    TABLE_NAMES.NPC_ASSETS,
    TABLE_NAMES.NPC_LIABILITIES,
    TABLE_NAMES.NPC_GOALS,
    TABLE_NAMES.NPC_MISFORTUNES,
    TABLE_NAMES.NPC_MISSIONS,
  ],
  CITY: [
    TABLE_NAMES.CITY_THEMES,
    TABLE_NAMES.CITY_EVENTS,
    TABLE_NAMES.CITY_DISTRICT_THEMES,
    TABLE_NAMES.CITY_UPPER_CLASS_BUILDINGS,
    TABLE_NAMES.CITY_LOWER_CLASS_BUILDINGS,
    TABLE_NAMES.CITY_ACTIVITIES,
    TABLE_NAMES.CITY_BUILDING_ROOMS,
    TABLE_NAMES.CITY_BUILDING_FEATURE,
    TABLE_NAMES.CITY_STREET_FEATURES,
    TABLE_NAMES.CITY_FACTIONS,
    TABLE_NAMES.CITY_FACTION_TRAITS,
    TABLE_NAMES.CITY_FACTION_GOALS,
  ],
  DUNGEON: [
    TABLE_NAMES.DUNGEON_ENTRANCES,
    TABLE_NAMES.DUNGEON_FORMS,
    TABLE_NAMES.DUNGEON_LAYOUT,
    TABLE_NAMES.DUNGEON_RUINATIONS,
    TABLE_NAMES.DUNGEON_REWARDS,
    TABLE_NAMES.DUNGEON_ACTIVITIES,
    TABLE_NAMES.DUNGEON_ROOMS,
    TABLE_NAMES.DUNGEON_ROOM_DETAILS,
    TABLE_NAMES.DUNGEON_TRICKS,
    TABLE_NAMES.DUNGEON_HAZARDS,
    TABLE_NAMES.DUNGEON_TRAP_EFFECTS,
    TABLE_NAMES.DUNGEON_TRAP_TRIGGERS,
  ],
  MAGIC: [
    TABLE_NAMES.MAGIC_TABLE_ROLL,
    TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS,
    TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS,
    TABLE_NAMES.MAGIC_PHYSICAL_FORMS,
    TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS,
    TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS,
    TABLE_NAMES.MAGIC_ETHEREAL_FORMS,
  ],
  MUTATION: [
    TABLE_NAMES.MAGIC_MUTATIONS,
    TABLE_NAMES.MONSTER_AERIAL_FORM,
    TABLE_NAMES.MONSTER_AQUATIC_FORM,
    TABLE_NAMES.MONSTER_TERRESTRIAL_FORM,
    TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS,
  ],
  INSANITY: [
    TABLE_NAMES.MAGIC_INSANITIES,
    TABLE_NAMES.MONSTER_AERIAL_FORM,
    TABLE_NAMES.MONSTER_AQUATIC_FORM,
    TABLE_NAMES.MONSTER_TERRESTRIAL_FORM,
    TABLE_NAMES.MONSTER_FEATURES,
    TABLE_NAMES.MONSTER_TRAITS,
    TABLE_NAMES.CHARACTER_PERSONALITY,
  ],
  CATASTROPHES: [
    TABLE_NAMES.MAGIC_CATASTROPHES,
    TABLE_NAMES.MAGIC_MUTATIONS,
    TABLE_NAMES.MAGIC_INSANITIES,
  ],
};

export const PRESET_LABELS = {
  "": "Choose a preset",
  ALL: "All tables",
  MAGIC: "Magic Spells",
  CHARACTER: "Character Traits & Personality",
  MONSTER: "Monsters",
  NAMES: "Names",
  NPC: "NPC",
  CITY: "City",
  DUNGEON: "Dungeons",
  MUTATION: "Mutations",
  INSANITY: "Insanities",
  CATASTROPHES: "Catastrophes",
};
