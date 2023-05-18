import React from "react";
import {
  generateCharacterText,
  generateCityText,
  generateMagicText,
  generateMonsterText,
  generateNPCText,
} from "../descriptionUtils";
import { PRESETS, PRESET_LABELS } from "../constants/presets";
import { Result } from "./Result";

export const Results = ({ result, onAddSaved, onClickTag }) => {
  return (
    <>
      {generateMagicText(result, onClickTag, onAddSaved)}
      {generateCharacterText(result, onClickTag, onAddSaved)}
      {generateMonsterText(result, onClickTag, onAddSaved)}
      {generateNPCText(result, onClickTag, onAddSaved)}
      {generateCityText(result, onClickTag, onAddSaved)}
      <Result
        result={result}
        label={PRESET_LABELS.DUNGEON}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.DUNGEON}
      />
      <Result
        result={result}
        label={PRESET_LABELS.MUTATION}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.MUTATION}
      />
      <Result
        result={result}
        label={PRESET_LABELS.INSANITY}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.INSANITY}
      />
      <Result
        result={result}
        label={PRESET_LABELS.CATASTROPHES}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.CATASTROPHES}
      />
    </>
  );
};
