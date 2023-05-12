import { CHARACTER_PROPERTY_TO_FLAVOR_TEXT, TABLE_NAMES } from "./constants";

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

  const getCSVText = (val, prefix = "", suffix = "", first = false) =>
    val ? `${first ? "" : ", "}${prefix}${val}${suffix}` : "";

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

/* CHARACTER_SEX,
  CHARACTER_APPEARANCE,
  CHARACTER_PHYSICAL_DETAIL,
  CHARACTER_CLOTHES,
  CHARACTER_PERSONALITY,
  CHARACTER_MANNERISM,
  CHARACTER_GOTHIC_BACKGROUND, */
