import { CHARACTER_PROPERTY_TO_FLAVOR_TEXT, TABLE_NAMES } from "./constants";
import styles from "./descriptionUtils.module.scss";

const getCSVText = (val, prefix = "", suffix = "", first = false) =>
  val ? `${first ? "" : ", "}${prefix}${val}${suffix}` : "";

export const generateCharacterText = (result) => {
  if (Object.keys(result).every((k) => k.indexOf("CHARACTER_") === -1)) {
    return null;
  }

  const sexText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.CHARACTER_SEX]] ||
    result[TABLE_NAMES.CHARACTER_SEX] ||
    "";

  const raceText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.CHARACTER_RACE]] ||
    result[TABLE_NAMES.CHARACTER_RACE] ||
    "person";

  const appearanceText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[
      result[TABLE_NAMES.CHARACTER_APPEARANCE]
    ] ||
    result[TABLE_NAMES.CHARACTER_APPEARANCE] ||
    "normal";

  const detailText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[
      result[TABLE_NAMES.CHARACTER_PHYSICAL_DETAIL]
    ] ||
    result[TABLE_NAMES.CHARACTER_PHYSICAL_DETAIL] ||
    "";

  const clothesText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.CHARACTER_CLOTHES]] ||
    result[TABLE_NAMES.CHARACTER_CLOTHES] ||
    "traveling clothes";

  const mannerismText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[
      result[TABLE_NAMES.CHARACTER_MANNERISM]
    ] ||
    result[TABLE_NAMES.CHARACTER_MANNERISM] ||
    "";

  const personalityText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[
      result[TABLE_NAMES.CHARACTER_PERSONALITY]
    ] ||
    result[TABLE_NAMES.CHARACTER_PERSONALITY] ||
    "";

  return (
    <span>
      <span>
        <b>Character: </b>
        {`a full-body shot of a fantasy themed ${sexText}${getCSVText(
          raceText,
          " ",
          "",
          true
        )} with a ${appearanceText} build${getCSVText(detailText)}${getCSVText(
          clothesText,
          "wearing ",
          " clothes"
        )}${getCSVText(personalityText, "and a ", " personality")}
    `}
      </span>
      {mannerismText && (
        <>
          <br></br>
          <span>{getCSVText(mannerismText, "Mannerism - ", "", true)}</span>
        </>
      )}
    </span>
  );
};

const valToAnimal = {
  Aerial: TABLE_NAMES.MONSTER_AERIAL_FORM,
  Terrestrial: TABLE_NAMES.MONSTER_TERRESTRIAL_FORM,
  Aquatic: TABLE_NAMES.MONSTER_AQUATIC_FORM,
};
export const generateMonsterText = (result) => {
  if (Object.keys(result).every((k) => k.indexOf("MONSTER_") === -1)) {
    return null;
  }

  const species =
    result[valToAnimal[result[TABLE_NAMES.MONSTER_TYPE]]] ||
    result[TABLE_NAMES.MONSTER_TYPE];

  const featuresText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_FEATURES]] ||
    result[TABLE_NAMES.MONSTER_FEATURES];

  let traitsText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_TRAITS]] ||
    result[TABLE_NAMES.MONSTER_TRAITS];

  if (result[TABLE_NAMES.MONSTER_TRAITS] === "Physical Element") {
    traitsText = result[TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS] || traitsText;
  } else if (result[TABLE_NAMES.MONSTER_TRAITS] === "Ethereal Element") {
    traitsText = result[TABLE_NAMES.MAGIC_ETHEREAL_ELEMENTS] || traitsText;
  }

  let abilitiesText =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_ABILITIES]] ||
    result[TABLE_NAMES.MONSTER_ABILITIES];

  if (result[TABLE_NAMES.MONSTER_TRAITS] === "Physical Effect") {
    abilitiesText = result[TABLE_NAMES.MAGIC_PHYSICAL_EFFECTS] || abilitiesText;
  } else if (result[TABLE_NAMES.MONSTER_TRAITS] === "Ethereal Effect") {
    abilitiesText = result[TABLE_NAMES.MAGIC_ETHEREAL_EFFECTS] || abilitiesText;
  }

  const tactics =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_TACTICS]] ||
    result[TABLE_NAMES.MONSTER_TACTICS];

  const personality =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[
      result[TABLE_NAMES.MONSTER_PERSONALITY]
    ] || result[TABLE_NAMES.MONSTER_PERSONALITY];

  let weakness =
    CHARACTER_PROPERTY_TO_FLAVOR_TEXT[result[TABLE_NAMES.MONSTER_WEAKNESS]] ||
    result[TABLE_NAMES.MONSTER_WEAKNESS];

  if (result[TABLE_NAMES.MONSTER_WEAKNESS] === "Physical Element") {
    weakness = result[TABLE_NAMES.MAGIC_PHYSICAL_ELEMENTS] || weakness;
  }

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

  return (
    <span className={styles["monster"]}>
      <b>Monster: </b>
      <br />
      <Tag label="Species" val={species} />
      <Tag label="Features" val={featuresText} />
      <Tag label="Traits" val={traitsText} />
      <Tag label="Abilities" val={abilitiesText} />
      <Tag label="Tactics" val={tactics} />
      <Tag label="Personality" val={personality} />
      <Tag label="Weakness" val={weakness} />
    </span>
  );
};
