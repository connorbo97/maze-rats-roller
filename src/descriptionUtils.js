import { TABLES, TABLE_NAMES } from "./constants";
import styles from "./descriptionUtils.module.scss";
import { flatten, uniq, values } from "lodash";

const getCSVText = (val, prefix = "", suffix = "", first = false) =>
  val ? `${first ? "" : ", "}${prefix}${val}${suffix}` : "";

const calcTableNameFromTableRollValue = (
  tableRollValue,
  defaultTable = TABLE_NAMES.MAGIC_ETHEREAL_FORMS
) => {
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
      return defaultTable;
  }
};

export const generateMagicText = (result, onClickTag, onSave) => {
  if (!result[TABLE_NAMES.MAGIC_TABLE_ROLL]) {
    return null;
  }
  const values = result[TABLE_NAMES.MAGIC_TABLE_ROLL].map((v) =>
    v.split(" + ")
  );

  const spellName = values
    .map((v) =>
      v
        .map(
          (tName) =>
            uniq(result[calcTableNameFromTableRollValue(tName)]).join(
              TABLES[calcTableNameFromTableRollValue(tName)].valueSeparator ||
                " "
            ) || ""
        )
        .filter((v) => v)
        .join(" ")
    )
    .join(", ");

  const jsxResult = (
    <div>
      <span className={styles["monster"]}>
        <b>
          <u>Spell Name:</u>
        </b>
        <br />
        <span style={{ borderRight: "0" }}>{spellName}</span>
      </span>
      <br />
      <span>{`A spell called ${spellName}`}</span>
    </div>
  );

  return (
    <div className={styles["save-container"]}>
      {jsxResult}
      <button onClick={() => onSave(jsxResult)}>SAVE</button>
    </div>
  );
};

export const renderCharacterBottomText = (formattedMap, tables) => {
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
  )}`;

  return (
    <>
      <br />
      <div>{descriptionText}</div>
    </>
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
export const generateMonsterText = (result, onClickTag, onSave) => {
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

export const renderNPCBottomText = (formattedMap) => {
  const job = [
    formattedMap[TABLE_NAMES.NPC_OCCUPATION_CIVILIZATION],
    formattedMap[TABLE_NAMES.NPC_OCCUPATION_UNDERWORLD],
    formattedMap[TABLE_NAMES.NPC_OCCUPATION_WILDERNESS],
  ]
    .filter((v) => v)
    .join("/");
  const prefix = `a full body shot of a fantasy themed  ${job || "NPC"}`;

  const restOfText = ` who was ${
    formattedMap[TABLE_NAMES.NPC_MISFORTUNES]
  } and is now on a mission to ${
    formattedMap[TABLE_NAMES.NPC_GOALS]
  }, but they're known to be ${formattedMap[TABLE_NAMES.NPC_LIABILITIES]}`;
  return (
    <>
      <br />
      <div>{`${prefix}${restOfText}`}</div>
    </>
  );
};

const permutations = (collection, n) => {
  let array = values(collection);
  if (array.length < n) {
    return [];
  }
  let recur = (array, n) => {
    if (--n < 0) {
      return [[]];
    }
    let permutations = [];
    array.forEach((value, index, array) => {
      array = array.slice();
      array.splice(index, 1);
      recur(array, n).forEach((permutation) => {
        permutation.unshift(value);
        permutations.push(permutation);
      });
    });
    return permutations;
  };
  return recur(array, n);
};

export const renderNameBottomText = (formattedMap, _, result) => {
  const tables = [
    TABLE_NAMES.NAME_MALE_NAME,
    TABLE_NAMES.NAME_FEMALE_NAME,
    TABLE_NAMES.NAME_UPPER_CLASS_LAST_NAME,
    TABLE_NAMES.NAME_LOWER_CLASS_LAST_NAME,
  ];
  const arr = tables
    .map((t) =>
      t === TABLE_NAMES.NAME_NICKNAME && formattedMap[t]
        ? `"${formattedMap[t]}"`
        : formattedMap[t]
    )
    .filter((v) => v);
  const perms = permutations(arr, 2);
  const allNames = perms.map((p) => p.join(" "));
  let nickNamedArr = [];
  if (formattedMap[TABLE_NAMES.NAME_NICKNAME]) {
    const nickNames = result[TABLE_NAMES.NAME_NICKNAME].map((n) =>
      calcTableNameFromTableRollValue(n, null)
        ? formattedMap[calcTableNameFromTableRollValue(n, null)]
        : n
    );

    nickNamedArr = flatten(
      nickNames.map((n) => perms.map((p) => p.join(` "${n}" `)))
    );
  }
  const text = allNames.join(" | ");
  const nickNamedText = nickNamedArr.join(" | ");
  return (
    <div>
      <br />
      <div>{text}</div>

      {nickNamedText && (
        <>
          <br />
          <div>{nickNamedText}</div>
        </>
      )}
    </div>
  );
};
