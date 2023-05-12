import React from "react";

declare type TableDef = {
  [group: string]: Array<string>;
};
declare type Table = {
  table: TableDef;
  label: string;
  getResultText?: Function;
  calculateValue?: Function;
};
enum TableNameEnum {
  MAGIC_TABLE_ROLL = "MAGIC_TABLE_ROLL",
}
export const TABLE_NAMES = {
  MAGIC_TABLE_ROLL: "MAGIC_TABLE_ROLL",
  MAGIC_PHYSICAL_EFFECTS: "MAGIC_PHYSICAL_EFFECTS",
  MAGIC_PHYSICAL_ELEMENTS: "MAGIC_PHYSICAL_ELEMENTS",
  MAGIC_PHYSICAL_FORMS: "MAGIC_PHYSICAL_FORMS",
  MAGIC_ETHEREAL_EFFECTS: "MAGIC_ETHEREAL_EFFECTS",
  MAGIC_ETHEREAL_ELEMENTS: "MAGIC_ETHEREAL_ELEMENTS",
  MAGIC_ETHEREAL_FORMS: "MAGIC_ETHEREAL_FORMS",
  CHARACTER_SEX: "CHARACTER_SEX",
  CHARACTER_RACE: "CHARACTER_RACE",
  CHARACTER_APPEARANCE: "CHARACTER_APPEARANCE",
  CHARACTER_PHYSICAL_DETAIL: "CHARACTER_PHYSICAL_DETAIL",
  CHARACTER_CLOTHES: "CHARACTER_CLOTHES",
  CHARACTER_PERSONALITY: "CHARACTER_PERSONALITY",
  CHARACTER_MANNERISM: "CHARACTER_MANNERISM",
  GOTHIC_BACKGROUND: "GOTHIC_BACKGROUND",
};
export const TABLE_NAMES_LIST = Object.values(TABLE_NAMES);

export const TABLES: { [s: string]: Table } = {
  [TABLE_NAMES.MAGIC_TABLE_ROLL]: {
    label: "Magic Spells: Table Roll",
    table: {
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
    },
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
      const resultString =
        result[TABLE_NAMES.MAGIC_TABLE_ROLL]
          ?.map((name) => result?.[name])
          .join(" ") || "";

      if (!resultString) {
        return null;
      }

      return (
        <div>
          <b>Spell name:</b> {resultString}
        </div>
      );
    },
  },
  [TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS]: {
    label: "Magic Spells: Physical Effects",
    table: {
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
    },
  },
  [TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS]: {
    label: "Magic Spells: Physical Elements",
    table: {
      "1": ["Acid", "Amber", "Bark", "Blood", "Bone", "Brine"],
      "2": ["Clay", "Crow", "Crystal", "Ember", "Flesh", "Fungus"],
      "3": ["Glass", "Honey", "Ice", "Insect", "Wood", "Lava"],
      "4": ["Moss", "Obsidian", "Oil", "Poison", "Rat", "Salt"],
      "5": ["Sand", "Sap", "Serpent", "Slime", "Stone", "Tar"],
      "6": ["Thorn", "Vine", "Water", "Wine", "Wood", "Worm"],
    },
  },
  [TABLE_NAMES.MAGIC_PHYSICAL_FORMS]: {
    label: "Magic Spells: Physical Forms",
    table: {
      "1": ["Altar", "Armor", "Arrow", "Beast", "Blade", "Cauldron"],
      "2": ["Chain", "Chariot", "Claw", "Cloak", "Colossus", "Crown"],
      "3": ["Elemental", "Eye", "Fountain", "Gate", "Golem", "Hammer"],
      "4": ["Horn", "Key", "Mask", "Monolith", "Pit", "Prison"],
      "5": ["Sentinel", "Servant", "Shield", "Spear", "Steed", "Swarm"],
      "6": ["Tentacle", "Throne", "Torch", "Trap", "Wall", "Web"],
    },
  },
  [TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS]: {
    label: "Magic Spells: Ethereal Effects",
    table: {
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
    },
  },
  [TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS]: {
    label: "Magic Spells: Ethereal Elements",
    table: {
      "1": ["Ash", "Chaos", "Distortion", "Dream", "Dust", "Echo"],
      "2": ["Ectoplasm", "Fire", "Fog", "Ghost", "Harmony", "Heat"],
      "3": ["Light", "Lightning", "Memory", "Mind", "Mutation", "Negation"],
      "4": ["Plague", "Plasma", "Probability", "Rain", "Rot", "Shadow"],
      "5": ["Smoke", "Snow", "Soul", "Star", "Stasis", "Steam"],
      "6": ["Thunder", "Time", "Void", "Warp", "Whisper", "Wind"],
    },
  },
  [TABLE_NAMES.MAGIC_ETHEREAL_FORMS]: {
    label: "Magic Spells: Ethereal Forms",

    table: {
      "1": ["Aura", "Beacon", "Beam", "Blast", "Blob", "Bolt"],
      "2": ["Bubble", "Call", "Cascade", "Circle", "Cloud", "Coil"],
      "3": ["Cone", "Cube", "Dance", "Disk", "Field", "Form"],
      "4": ["Gaze", "Loop", "Moment", "Nexus", "Portal", "Pulse"],
      "5": ["Pyramid", "Ray", "Shard", "Sphere", "Spray", "Storm"],
      "6": ["Swarm", "Torrent", "Touch", "Vortex", "Wave", "Word"],
    },
  },

  [TABLE_NAMES.CHARACTER_SEX]: {
    label: "Character: Sex",
    table: {
      "1": ["Male"],
      "2": ["Female"],
      "3": ["Hard to tell"],
    },
  },
  [TABLE_NAMES.CHARACTER_RACE]: {
    label: "Character: Race",
    table: {
      "1": ["Dragonborn", "Dwarf", "Elf", "Gnome"],
      "2": ["Half-elf", "Halfling", "Half-orc", "Human"],
      "3": ["Tiefling", "Bugbear", "Genasi", "Harengon"],
      "4": ["Hobgoblin", "Lizardfolk", "Minotaur", "Tabaxi"],
    },
  },
  [TABLE_NAMES.CHARACTER_APPEARANCE]: {
    label: "Character: Build",
    table: {
      "1": [
        "Aquiline",
        "Athletic",
        "Barrel-Chested",
        "Boney",
        "Brawny",
        "Brutish",
      ],
      "2": [
        "Bullnecked",
        "Chiseled",
        "Coltish",
        "Corpulent",
        "Craggy",
        "Delicate",
      ],
      "3": ["Furrowed", "Gaunt", "Gorgeous", "Grizzled", "Haggard", "Handsome"],
      "4": ["Hideous", "Lanky", "Pudgy", "Ripped", "Rosy", "Scrawny"],
      "5": [
        "Sinewy",
        "Slender",
        "Slumped",
        "Solid",
        "Square-Jawed",
        "Statuesque",
      ],
      "6": ["Towering", "Trim", "Weathered", "Willowy", "Wiry", "Wrinkled"],
    },
  },
  [TABLE_NAMES.CHARACTER_PHYSICAL_DETAIL]: {
    label: "Character: Physical Detail",
    table: {
      "1": [
        "Acid scars",
        "Battle scars",
        "Birthmark",
        "Braided hair",
        "Brand mark",
        "Broken nose",
      ],
      "2": [
        "Bronze skinned",
        "Burn scars",
        "Bushy eyebrows",
        "Curly hair",
        "Dark skinned",
        "Dreadlocks",
      ],
      "3": [
        "Exotic accent",
        "Flogging scars",
        "Freckles",
        "Gold tooth",
        "Hoarse voice",
        "Huge beard",
      ],
      "4": [
        "Long hair",
        "Matted hair",
        "Missing ear",
        "Missing teeth",
        "Mustache",
        "Muttonchops",
      ],
      "5": [
        "Nine fingers",
        "Oiled hair",
        "One-eyed",
        "Pale skinned",
        "Piercings",
        "Ritual scars",
      ],
      "6": [
        "Sallow skin",
        "Shaved head",
        "Sunburned",
        "Tangled Hair",
        "Tattoos",
        "Topknot",
      ],
    },
  },
  [TABLE_NAMES.CHARACTER_CLOTHES]: {
    label: "Character: Clothes",
    table: {
      "1": [
        "Antique",
        "Battle-torn",
        "Bedraggled",
        "Blood-stained",
        "Ceremonial",
        "Dated",
      ],
      "2": [
        "Decaying",
        "Eccentric",
        "Elegant",
        "Embroidered",
        "Exotic",
        "Fashionable",
      ],
      "3": [
        "Flamboyant",
        "Food-stained",
        "Formal",
        "Frayed",
        "Frumpy",
        "Garish",
      ],
      "4": [
        "Grimy",
        "Haute couture",
        "Lacey",
        "Livery",
        "Mud-stained",
        "Ostentatious",
      ],
      "5": [
        "Oversized",
        "Patched",
        "Patterned",
        "Perfumed",
        "Practical",
        "Rumpled",
      ],
      "6": [
        "Sigils",
        "Singed",
        "Tasteless",
        "Undersized",
        "Wine-stained",
        "Worn out",
      ],
    },
  },
  [TABLE_NAMES.CHARACTER_PERSONALITY]: {
    label: "Character: Personality",
    table: {
      "1": ["Bitter", "Brave", "Cautious", "Chipper", "Contrary", "Cowardly"],
      "2": [
        "Cunning",
        "Driven",
        "Entitled",
        "Gregarious",
        "Grumpy",
        "Heartless",
      ],
      "3": [
        "Honor-bound",
        "Hotheaded",
        "Inquisitive",
        "Irascible",
        "Jolly",
        "Know-it-all",
      ],
      "4": ["Lazy", "Loyal", "Menacing", "Mopey", "Nervous", "Protective"],
      "5": ["Righteous", "Rude", "Sarcastic", "Savage", "Scheming", "Serene"],
      "6": [
        "Spacey",
        "Stoic",
        "Stubborn",
        "Stuck-up",
        "Suspicious",
        "Wisecracking",
      ],
    },
  },
  [TABLE_NAMES.CHARACTER_MANNERISM]: {
    label: "Character: Mannerism",
    table: {
      "1": [
        "Anecdotes",
        "Breathy",
        "Chuckles",
        "Clipped",
        "Cryptic",
        "Deep voice",
      ],
      "2": [
        "Drawl",
        "Enunciates",
        "Flowery speech",
        "Gravelly voice",
        "Highly formal",
        "Hypnotic",
      ],
      "3": [
        "Interrupts",
        "Laconic",
        "Laughs",
        "Long pauses",
        "Melodious",
        "Monotone",
      ],
      "4": [
        "Mumbles",
        "Narrates",
        "Overly casual",
        "Quaint sayings",
        "Rambles",
        "Random facts",
      ],
      "5": [
        "Rapid-fire",
        "Rhyming",
        "Robotic",
        "Slow speech",
        "Speechifies",
        "Squeaky",
      ],
      "6": [
        "Street slang",
        "Stutters",
        "Talks to self",
        "Trails off",
        "Very loud",
        "Whispers",
      ],
    },
  },
  [TABLE_NAMES.GOTHIC_BACKGROUND]: {
    label: "Character: Gothic Background",
    table: {
      "1": [
        "Alchemist",
        "Beggar-prince",
        "Blackmailer",
        "Bounty-hunter",
        "Chimney sweep",
        "Coin-clipper",
      ],
      "2": [
        "Contortionist",
        "Counterfeiter",
        "Cultist",
        "Cutpurse",
        "Debt-collector",
        "Deserter",
      ],
      "3": [
        "Fence",
        "Fortuneteller",
        "Galley slave",
        "Gabler",
        "Gravedigger",
        "Headsman",
      ],
      "4": [
        "Hedge knight",
        "Highwayman",
        "Housebreaker",
        "Kidnapper",
        "Mad prophet",
        "Mountebank",
      ],
      "5": [
        "Peddler",
        "Pit-fighter",
        "Poisoner",
        "Rat-catcher",
        "Scrivener",
        "Sellsword",
      ],
      "6": [
        "Slave",
        "Smuggler",
        "Street performer",
        "Tattooist",
        "Urchin",
        "Usurer",
      ],
    },
  },
};

export const CHARACTER_PROPERTY_TO_FLAVOR_TEXT = {
  Male: "male",
  Female: "female",
  "Hard to tell": "gender fluid",
  Birthmark: "a birthmark",
  "Brand mark": "a brand mark",
  "Broken nose": "a crooked nose",
  "Exotic accent": "an exotic accent",
  "Gold tooth": "a smile with a gold tooth",
  "Hoarse voice": "a hoarse voice",
  "One-eyed": "an eye patch",
  Sunburned: "sunburned skin",
  Topknot: "a topknot",
  Harengon: "anthropomorphic rabbit",
};

export const getTableLabel = (table) => {
  return TABLES[table]?.label || "UNNAMED_TABLE";
};
