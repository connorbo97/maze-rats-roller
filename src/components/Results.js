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
import styles from "./results.module.scss";

export const Results = ({ result, onAddSaved, onClickTag, onDeleteSaved }) => {
  return (
    <div className={styles["container"]}>
      <div className={styles["results"]}>
        {generateMagicText(result, onClickTag, onAddSaved)}
        <Result
          result={result}
          label={PRESET_LABELS.CHARACTER}
          onClickTag={onClickTag}
          tables={PRESETS.CHARACTER}
          renderBottomText={renderCharacterBottomText}
          shouldRender={prefixMatchShouldRenderFunc("CHARACTER_")}
        />
        <Result
          result={result}
          label={PRESET_LABELS.MONSTER}
          onClickTag={onClickTag}
          tables={PRESETS.MONSTER}
          shouldRender={prefixMatchShouldRenderFunc("MONSTER_")}
        />
        <Result
          result={result}
          label={PRESET_LABELS.NPC}
          onClickTag={onClickTag}
          tables={PRESETS.NPC}
          renderBottomText={renderNPCBottomText}
          shouldRender={prefixMatchShouldRenderFunc("NPC_")}
        />
        <Result
          result={result}
          label={PRESET_LABELS.NAMES}
          onClickTag={onClickTag}
          tables={PRESETS.NAMES}
          renderBottomText={renderNameBottomText}
          shouldRender={prefixMatchShouldRenderFunc("NAME_")}
        />
        <Result
          result={result}
          label={PRESET_LABELS.CITY}
          onClickTag={onClickTag}
          tables={PRESETS.CITY}
          shouldRender={prefixMatchShouldRenderFunc("CITY_")}
        />
        <Result
          result={result}
          label={PRESET_LABELS.DUNGEON}
          onClickTag={onClickTag}
          tables={PRESETS.DUNGEON}
          shouldRender={prefixMatchShouldRenderFunc("DUNGEON_")}
        />
        <Result
          result={result}
          label={PRESET_LABELS.MUTATION}
          onClickTag={onClickTag}
          tables={PRESETS.MUTATION}
          shouldRender={allMatchShouldRenderFunc}
        />
        <Result
          result={result}
          label={PRESET_LABELS.INSANITY}
          onClickTag={onClickTag}
          tables={PRESETS.INSANITY}
          shouldRender={allMatchShouldRenderFunc}
        />
        <Result
          result={result}
          label={PRESET_LABELS.CATASTROPHES}
          onClickTag={onClickTag}
          tables={PRESETS.CATASTROPHES}
          shouldRender={allMatchShouldRenderFunc}
        />
        <Result
          result={result}
          label={PRESET_LABELS.ITEM}
          onClickTag={onClickTag}
          tables={PRESETS.ITEM}
          shouldRender={prefixMatchShouldRenderFunc("ITEM_")}
        />
      </div>
      {Object.keys(result).length && onAddSaved && (
        <button onClick={() => onAddSaved(result)}>Save Result</button>
      )}
      {onDeleteSaved && <button onClick={onDeleteSaved}>Delete Result</button>}
    </div>
  );
};
