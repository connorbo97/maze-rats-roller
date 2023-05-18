import React from "react";
import {
  generateMagicText,
  renderCharacterBottomText,
  renderNPCBottomText,
  renderNameBottomText,
} from "../descriptionUtils";
import { PRESETS, PRESET_LABELS } from "../constants/presets";
import {
  Result,
  allMatchShouldRenderFunc,
  prefixMatchShouldRenderFunc,
} from "./Result";

export const Results = ({ result, onAddSaved, onClickTag }) => {
  return (
    <>
      {generateMagicText(result, onClickTag, onAddSaved)}
      <Result
        result={result}
        label={PRESET_LABELS.CHARACTER}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.CHARACTER}
        renderBottomText={renderCharacterBottomText}
        shouldRender={prefixMatchShouldRenderFunc("CHARACTER_")}
      />
      <Result
        result={result}
        label={PRESET_LABELS.MONSTER}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.MONSTER}
        shouldRender={prefixMatchShouldRenderFunc("MONSTER_")}
      />
      <Result
        result={result}
        label={PRESET_LABELS.NPC}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.NPC}
        renderBottomText={renderNPCBottomText}
        shouldRender={prefixMatchShouldRenderFunc("NPC_")}
      />
      <Result
        result={result}
        label={PRESET_LABELS.NAMES}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.NAMES}
        shouldRender={allMatchShouldRenderFunc}
        renderBottomText={renderNameBottomText}
      />
      <Result
        result={result}
        label={PRESET_LABELS.CITY}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.CITY}
        shouldRender={prefixMatchShouldRenderFunc("CITY_")}
      />
      <Result
        result={result}
        label={PRESET_LABELS.DUNGEON}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.DUNGEON}
        shouldRender={prefixMatchShouldRenderFunc("DUNGEON_")}
      />
      <Result
        result={result}
        label={PRESET_LABELS.MUTATION}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.MUTATION}
        shouldRender={allMatchShouldRenderFunc}
      />
      <Result
        result={result}
        label={PRESET_LABELS.INSANITY}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.INSANITY}
        shouldRender={allMatchShouldRenderFunc}
      />
      <Result
        result={result}
        label={PRESET_LABELS.CATASTROPHES}
        onClickTag={onClickTag}
        onSave={onAddSaved}
        tables={PRESETS.CATASTROPHES}
        shouldRender={allMatchShouldRenderFunc}
      />
    </>
  );
};
