import "./app.module.scss";
import styles from "./app.module.scss";
import { Table } from "./components/Table";
import { TABLES, TABLE_NAMES } from "./constants/tables";
import { getTableLabel } from "./constants/tables";

import { PRESETS, PRESET_LABELS } from "./constants/presets";
import { useRedux } from "./redux";
import { useState } from "react";
import {
  generateCharacterText,
  generateCityText,
  generateMagicText,
  generateMonsterText,
  generateNPCText,
} from "./descriptionUtils";
import { Result } from "./components/Result";

const PAGES = {
  HOME: true,
  SAVED: false,
};

const App = () => {
  const {
    updateRollAll,
    tables,
    tablesSet,
    result,
    updateTables,
    updateForceRollByTable,
  } = useRedux();
  const [page, setPage] = useState(PAGES.HOME);
  const { saved, setSaved } = useRedux();
  const [tableFilter, setTableFilter] = useState("");
  const onChangePreset = (e) => {
    updateTables(PRESETS[e.target.value]);
    e.target.value = "";
  };
  const onAddTable = (e) => {
    if (e.target.value) {
      updateTables([e.target.value, ...tables]);
    }
  };
  const onAddPreset = (e) => {
    if (e.target.value) {
      updateTables([...PRESETS[e.target.value], ...tables]);
      e.target.value = "";
    }
  };
  const onAddSaved = (res) => {
    const alertNote = prompt("Note about saved entry");
    setSaved((prev) => [{ note: alertNote, jsx: res }, ...prev]);
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["content"]}>
        <h1>Maze Rats Table Roller</h1>
        <div className={styles["buttons"]}>
          <button onClick={updateRollAll}>Roll All</button>
          <button onClick={() => updateTables([])}>Clear Tables</button>
          <button onClick={() => setPage((p) => !p)}>Toggle page</button>
          <select name="presets" id="presets" onChange={onChangePreset}>
            {Object.keys(PRESETS).map((preset) => (
              <option key={preset} value={preset}>
                {PRESET_LABELS[preset] || preset}
              </option>
            ))}
          </select>
          <select onChange={onAddPreset}>
            <option value="">Add a preset</option>
            {Object.keys(PRESETS)
              .filter((v) => v)
              .map((preset) => (
                <option key={preset} value={preset}>
                  {PRESET_LABELS[preset] || preset}
                </option>
              ))}
          </select>
          <select onChange={onAddTable}>
            <option value="">Add a table</option>
            {Object.keys(TABLE_NAMES)
              .filter(
                (table) =>
                  !tablesSet.has(table) &&
                  getTableLabel(table)
                    .toLowerCase()
                    .indexOf(tableFilter.toLowerCase()) !== -1
              )
              .map((table) => (
                <option key={table} value={table}>
                  {getTableLabel(table)}
                </option>
              ))}
          </select>
          <input
            value={tableFilter}
            onChange={(e) => setTableFilter(e.target.value)}
            placeholder="Table Filter"
          />
        </div>
        {page === PAGES.SAVED && (
          <div className={styles["saved-container"]}>
            {saved.map(({ note, jsx }) => {
              return (
                <div>
                  <div> {note}</div>
                  {jsx}
                </div>
              );
            })}
          </div>
        )}
        {page === PAGES.HOME && (
          <>
            <div className={styles["result"]}>
              {generateMagicText(result, updateForceRollByTable, onAddSaved)}
              {generateCharacterText(
                result,
                updateForceRollByTable,
                onAddSaved
              )}
              {generateMonsterText(result, updateForceRollByTable, onAddSaved)}
              {generateNPCText(result, updateForceRollByTable, onAddSaved)}
              {generateCityText(result, updateForceRollByTable, onAddSaved)}
              <Result
                result={result}
                onClickTag={updateForceRollByTable}
                onSave={onAddSaved}
                tables={PRESETS.DUNGEON}
                prefix={"DUNGEON_"}
              />
            </div>
            {!tables?.length && (
              <div className={styles["help-text"]}>
                Add a table or select a preset
              </div>
            )}
            <div className={styles["tables"]}>
              {tables.map((t) => (
                <Table table={TABLES[t].table} tableName={t} key={t} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
