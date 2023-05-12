import "./app.module.scss";
import styles from "./app.module.scss";
import { Table } from "./components/Table";
import { TABLES, TABLE_CONFIGS, TABLE_NAMES } from "./constants/tables";
import { getTableLabel } from "./constants/tableLabels";

import { PRESETS, PRESET_LABELS } from "./constants/presets";
import { useRedux } from "./redux";
import { useState } from "react";

const App = () => {
  const { updateRollAll, tables, tablesSet, result, updateTables } = useRedux();
  const [tableFilter, setTableFilter] = useState("");
  const onChangePreset = (e) => {
    updateTables(PRESETS[e.target.value]);
  };
  const onAddTable = (e) => {
    if (e.target.value) {
      updateTables([e.target.value, ...tables]);
    }
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["content"]}>
        <h1>Maze Rats Table Roller</h1>
        <div className={styles["buttons"]}>
          <button onClick={updateRollAll}>Roll All</button>
          <button onClick={() => updateTables([])}>Clear Tables</button>
          <select name="presets" id="presets" onChange={onChangePreset}>
            {Object.keys(PRESETS).map((preset) => (
              <option key={preset} value={preset}>
                {PRESET_LABELS[preset] || preset}
              </option>
            ))}
          </select>
          <select onChange={onAddTable}>
            <option value="">Add a table</option>
            {Object.entries(TABLES)
              .filter(
                ([k, table]) =>
                  !tablesSet.has(table) &&
                  getTableLabel(table)
                    .toLowerCase()
                    .indexOf(tableFilter.toLowerCase()) !== -1
              )
              .map(([k, table]) => (
                <option key={k} value={k}>
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
        <div className={styles["result"]}>
          {Object.keys(result)
            .map(
              (k) =>
                TABLE_CONFIGS[k]?.getResultText &&
                TABLE_CONFIGS[k]?.getResultText(result)
            )
            .filter((v) => v)}
        </div>
        <div className={styles["tables"]}>
          {tables.map((t) => (
            <Table table={TABLES[t]} tableName={t} key={t} />
          ))}
          {!tables?.length && (
            <div className={styles["help-text"]}>
              Add a table or select a preset
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;