import React from "react";
import { mapValues } from "lodash";

declare type TableDef = {
  [group: string]: Array<string>;
};

export const MAGIC_TABLE_ROLL: TableDef = {
  "1": [
    "Physical Effect + Physical Form",
    "Physical Effect + Ethereal Form",
    "Ethereal Effect + Physical Form",
    "Ethereal Effect + Ethereal Form",
    "Physical Element + Physical Form",
    "Physical Element + Ethereal Form",
  ],
  "2": [
    "Ethereal Element + Physical Form",
    "Ethereal Element + Ethereal Form",
    "Physical Effect + Physical Element",
    "Physical Effect + Ethereal Element",
    "Ethereal Effect + Physical Element",
    "Ethereal Effect + Ethereal Element",
  ],
};

export const MAGIC_PHYSICAL_EFFECTS: TableDef = {
  "1": [
    "Animating",
    "Attracting",
    "Binding",
    "Blossoming",
    "Consuming",
    "Creeping",
  ],
  "2": [
    "Crushing",
    "Diminishing",
    "Dividing",
    "Duplicating",
    "Enveloping",
    "Expanding",
  ],
  "3": [
    "Fusing",
    "Grasping",
    "Hastening",
    "Hindering",
    "Illuminating",
    "Imprisoning",
  ],
  "4": [
    "Levitating",
    "Opening",
    "Petrifying",
    "Phasing",
    "Piercing",
    "Pursuing",
  ],
  "5": [
    "Reflecting",
    "Regenerating",
    "Rending",
    "Repelling",
    "Resurrecting",
    "Screaming",
  ],
  "6": [
    "Sealing",
    "Shapeshifting",
    "Shielding",
    "Spawning",
    "Transmuting",
    "Transporting",
  ],
};

export const MAGIC_PHYSICAL_ELEMENTS: TableDef = {
  "1": ["Acid", "Amber", "Bark", "Blood", "Bone", "Brine"],
  "2": ["Clay", "Crow", "Crystal", "Ember", "Flesh", "Fungus"],
  "3": ["Glass", "Honey", "Ice", "Insect", "Wood", "Lava"],
  "4": ["Moss", "Obsidian", "Oil", "Poison", "Rat", "Salt"],
  "5": ["Sand", "Sap", "Serpent", "Slime", "Stone", "Tar"],
  "6": ["Thorn", "Vine", "Water", "Wine", "Wood", "Worm"],
};

export const MAGIC_PHYSICAL_FORMS: TableDef = {
  "1": ["Altar", "Armor", "Arrow", "Beast", "Blade", "Cauldron"],
  "2": ["Chain", "Chariot", "Claw", "Cloak", "Colossus", "Crown"],
  "3": ["Elemental", "Eye", "Fountain", "Gate", "Golem", "Hammer"],
  "4": ["Horn", "Key", "Mask", "Monolith", "Pit", "Prison"],
  "5": ["Sentinel", "Servant", "Shield", "Spear", "Steed", "Swarm"],
  "6": ["Tentacle", "Throne", "Torch", "Trap", "Wall", "Web"],
};

export const MAGIC_ETHEREAL_EFFECTS: TableDef = {
  "1": [
    "Avenging",
    "Banishing",
    "Bewildering",
    "Blinding",
    "Charming",
    "Communicating",
  ],
  "2": [
    "Compelling",
    "Concealing",
    "Deafening",
    "Deceiving",
    "Deciphering",
    "Disguising",
  ],
  "3": [
    "Dispelling",
    "Emboldening",
    "Encoding",
    "Energizing",
    "Enlightening",
    "Enraging",
  ],
  "4": [
    "Excruciating",
    "Foreseeing",
    "Intoxicating",
    "Maddening",
    "Mesmerizing",
    "Mindreading",
  ],
  "5": [
    "Nullifying",
    "Paralyzing",
    "Revealing",
    "Revolting",
    "Scrying",
    "Silencing",
  ],
  "6": [
    "Soothing",
    "Summoning",
    "Terrifying",
    "Warding",
    "Wearying",
    "Withering",
  ],
};

export const MAGIC_ETHEREAL_ELEMENTS: TableDef = {
  "1": ["Ash", "Chaos", "Distortion", "Dream", "Dust", "Echo"],
  "2": ["Ectoplasm", "Fire", "Fog", "Ghost", "Harmony", "Heat"],
  "3": ["Light", "Lightning", "Memory", "Mind", "Mutation", "Negation"],
  "4": ["Plague", "Plasma", "Probability", "Rain", "Rot", "Shadow"],
  "5": ["Smoke", "Snow", "Soul", "Star", "Stasis", "Steam"],
  "6": ["Thunder", "Time", "Void", "Warp", "Whisper", "Wind"],
};

export const MAGIC_ETHEREAL_FORMS: TableDef = {
  "1": ["Aura", "Beacon", "Beam", "Blast", "Blob", "Bolt"],
  "2": ["Bubble", "Call", "Cascade", "Circle", "Cloud", "Coil"],
  "3": ["Cone", "Cube", "Dance", "Disk", "Field", "Form"],
  "4": ["Gaze", "Loop", "Moment", "Nexus", "Portal", "Pulse"],
  "5": ["Pyramid", "Ray", "Shard", "Sphere", "Spray", "Storm"],
  "6": ["Swarm", "Torrent", "Touch", "Vortex", "Wave", "Word"],
};

export const TABLES = {
  MAGIC_TABLE_ROLL,
  MAGIC_PHYSICAL_EFFECTS,
  MAGIC_PHYSICAL_ELEMENTS,
  MAGIC_PHYSICAL_FORMS,
  MAGIC_ETHEREAL_EFFECTS,
  MAGIC_ETHEREAL_ELEMENTS,
  MAGIC_ETHEREAL_FORMS,
};

export const TABLE_NAMES = mapValues(TABLES, (v, k) => k);
export const TABLE_NAMES_LIST = Object.keys(TABLES);

export const TABLE_CONFIGS = {
  [TABLE_NAMES.MAGIC_TABLE_ROLL]: {
    calculateValue: (valueOriginal) => {
      const value = valueOriginal.split(" + ");

      const calcTableNameFromTableRollValue = (tableRollValue) => {
        switch (tableRollValue) {
          case "Physical Effect":
            return TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS;
          case "Physical Element":
            return TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS;
          case "Physical Form":
            return TABLE_NAMES.MAGIC_PHYSICAL_FORMS;
          case "Ethereal Effect":
            return TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS;
          case "Ethereal Element":
            return TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS;
          case "Ethereal Form":
          default:
            return TABLE_NAMES.MAGIC_ETHEREAL_FORMS;
        }
      };

      return value.map((v) => calcTableNameFromTableRollValue(v));
    },
    getResultText: (result) => {
      if (!result) {
        return null;
      }
      const resultString = result[TABLE_NAMES.MAGIC_TABLE_ROLL]
        ?.map((name) => result?.[name])
        .join(" ") || '';

      if (!resultString) {
        return null;
      }

      return (
        <span>
          {resultString}
        </span>
      )
    }
  },
};
