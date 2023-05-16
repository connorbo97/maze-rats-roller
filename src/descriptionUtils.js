import {
  CHARACTER_PROPERTY_TO_FLAVOR_TEXT,
  TABLES,
  TABLE_NAMES,
} from "./constants";
import { PRESETS } from "./constants/presets";
import styles from "./descriptionUtils.module.scss";
import { uniq } from "lodash";
const getCSVText = (val, prefix = "", suffix = "", first = false) =>
  val ? `${first ? "" : ", "}${prefix}${val}${suffix}` : "";

const Tag = ({ val, label }) => {
  if (!val) {
    return null;
  }

  return (
    <span>
      <b>{label}: </b>
      {val}
    </span>
  );
};

export const generateMagicText = (result) => {
  if (!result[TABLE_NAMES.MAGIC_TABLE_ROLL]) {
    return null;
  }
  const values = result[TABLE_NAMES.MAGIC_TABLE_ROLL].map((v) =>
    v.split(" + ")
  );

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

  return (
    <span className={styles["monster"]}>
      <b>
        <u>Spell Name:</u>
      </b>
      <br />
      <span style={{ borderRight: "0" }}>
        {values
          .map((v) =>
            v
              .map(
                (tName) =>
                  uniq(result[calcTableNameFromTableRollValue(tName)]).join(
                    TABLES[calcTableNameFromTableRollValue(tName)]
                      .valueSeparator || " "
                  ) || ""
              )
              .filter((v) => v)
              .join(" ")
          )
          .join(", ")}
      </span>
    </span>
  );
};

export const generateCharacterText = (result) => {
  if (Object.keys(result).every((k) => k.indexOf("CHARACTER_") === -1)) {
    return null;
  }

  const tables = PRESETS.CHARACTER;
  const formattedMap = {};
  tables.forEach(
    (t) =>
      (formattedMap[t] = uniq(
        (result[t] || []).map((v) => CHARACTER_PROPERTY_TO_FLAVOR_TEXT[v] || v)
      ).join(", "))
  );
  const descriptionText = `a full-body shot of a fantasy themed ${
    formattedMap[TABLE_NAMES.CHARACTER_SEX]
  }${getCSVText(
    formattedMap[TABLE_NAMES.CHARACTER_RACE],
    " ",
    "",
    true
  )} with a ${formattedMap[TABLE_NAMES.CHARACTER_APPEARANCE]} build${getCSVText(
    formattedMap[TABLE_NAMES.CHARACTER_PHYSICAL_DETAIL]
  )}${getCSVText(
    formattedMap[TABLE_NAMES.CHARACTER_CLOTHES],
    "wearing ",
    " clothes"
  )}${getCSVText(
    formattedMap[TABLE_NAMES.CHARACTER_PERSONALITY],
    "and a ",
    " personality"
  )}
`;

  return (
    <div>
      <div className={styles["monster"]}>
        <b>
          <u>Character</u>
        </b>
        <br />
        {tables.map((t) => (
          <Tag
            label={TABLES[t].label.split("Character: ")[1]}
            val={formattedMap[t]}
          />
        ))}
      </div>
      <br />
      <div>{descriptionText}</div>
    </div>
  );
};

// const valToAnimal = {
//   Aerial: TABLE_NAMES.MONSTER_AERIAL_FORM,
//   Terrestrial: TABLE_NAMES.MONSTER_TERRESTRIAL_FORM,
//   Aquatic: TABLE_NAMES.MONSTER_AQUATIC_FORM,
// };
// const POSITIONS = {
//   ADJECTIVE: "ADJECTIVE",
//   NOUN: "NOUN",
// };
// const valToPosition = {
//   Legless: POSITIONS.ADJECTIVE,
//   "Many-eyed": POSITIONS.ADJECTIVE,
//   "Many-limbed": POSITIONS.ADJECTIVE,
//   Segmented: POSITIONS.ADJECTIVE,
// };
// const valToPrefix = {
//   Carapace: "with a ",
//   "Long tongue": "with a ",
//   Mucus: "excreting ",
//   Plates: "hardened ",
//   Proboscis: "with a ",
//   Shell: "with a ",
//   Spinneret: "with a ",
//   Stinger: "with a ",
//   Tail: "with a ",
//   Trunk: "with an elephant-like ",
// };
export const generateMonsterText = (result) => {
  if (Object.keys(result).every((k) => k.indexOf("MONSTER_") === -1)) {
    return null;
  }

  const tables = PRESETS.MONSTER;

  const formattedMap = {};
  tables.forEach((t) => {
    formattedMap[t] = (result[t] || [])
      .map((v) => {
        if (v === "Physical Element") {
          return result[TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS] || v;
        } else if (v === "Physical Effect") {
          return result[TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS] || v;
        } else if (v === "Ethereal Element") {
          return result[TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS] || v;
        } else if (v === "Ethereal Effect") {
          return result[TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS] || v;
        }

        return v;
      })
      .map((v) => CHARACTER_PROPERTY_TO_FLAVOR_TEXT[v] || v)
      .join(", ");
  });

  return (
    <span className={styles["monster"]}>
      <b>
        <u>Monster</u>
      </b>
      <br />
      {tables.map((t) => (
        <Tag label={TABLES[t].label.split(": ")[1]} val={formattedMap[t]} />
      ))}
    </span>
  );

  // const species =
  //   result[valToAnimal[result[TABLE_NAMES.MONSTER_TYPE]]] ||
  //   result[TABLE_NAMES.MONSTER_TYPE];

  // const featuresText =
  //   CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_FEATURES]] ||
  //   result[TABLE_NAMES.MONSTER_FEATURES];

  // let traitsText =
  //   CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_TRAITS]] ||
  //   result[TABLE_NAMES.MONSTER_TRAITS];

  // if (result[TABLE_NAMES.MONSTER_TRAITS] === "Physical Element") {
  //   traitsText = result[TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS] || traitsText;
  // } else if (result[TABLE_NAMES.MONSTER_TRAITS] === "Ethereal Element") {
  //   traitsText = result[TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS] || traitsText;
  // }

  // let abilitiesText =
  //   CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_ABILITIES]] ||
  //   result[TABLE_NAMES.MONSTER_ABILITIES];

  // if (result[TABLE_NAMES.MONSTER_TRAITS] === "Physical Effect") {
  //   abilitiesText = result[TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS] || abilitiesText;
  // } else if (result[TABLE_NAMES.MONSTER_TRAITS] === "Ethereal Effect") {
  //   abilitiesText = result[TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS] || abilitiesText;
  // }

  // const tactics =
  //   CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_TACTICS]] ||
  //   result[TABLE_NAMES.MONSTER_TACTICS];

  // const personality =
  //   CHARACTER_PROPERTY_TO_FLAVOR_TEXT[
  //     result[TABLE_NAMES.MONSTER_PERSONALITY]
  //   ] || result[TABLE_NAMES.MONSTER_PERSONALITY];

  // let weakness =
  //   CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_WEAKNESS]] ||
  //   result[TABLE_NAMES.MONSTER_WEAKNESS];

  // if (result[TABLE_NAMES.MONSTER_WEAKNESS] === "Physical Element") {
  //   weakness = result[TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS] || weakness;
  // }

  // return (
  //   <span className={styles["monster"]}>
  //     <b>
  //       <u>Monster</u>
  //     </b>
  //     <br />
  //     <Tag label="Species" val={species} />
  //     <Tag label="Features" val={featuresText} />
  //     <Tag label="Traits" val={traitsText} />
  //     <Tag label="Abilities" val={abilitiesText} />
  //     <Tag label="Tactics" val={tactics} />
  //     <Tag label="Personality" val={personality} />
  //     <Tag label="Weakness" val={weakness} />
  //   </span>
  // );
};

export const generateNPCText = (result) => {
  const tables = PRESETS.NPC;
  if (Object.keys(result).every((k) => k.indexOf("NPC_") === -1)) {
    return null;
  }

  return (
    <span className={styles["monster"]}>
      <b>
        <u>NPC</u>
      </b>
      <br />
      {tables.map((t) => (
        <Tag
          label={TABLES[t].label.split("NPC: ")[1]}
          val={CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[t]] || result[t]}
        />
      ))}
    </span>
  );
};
