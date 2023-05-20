import "./app.module.scss";
import styles from "./app.module.scss";
import { Table } from "./components/Table";
import { TABLES, TABLE_NAMES } from "./constants/tables";
import { getTableLabel } from "./constants/tables";

import { PRESETS, PRESET_LABELS } from "./constants/presets";
import { useRedux } from "./redux";
import { useState } from "react";
import { Results } from "./components/Results";
import classnames from "classnames/bind";

const classNameBuilder = classnames.bind(styles);

const PAGES = {
  HOME: 0,
  SAVED: 1,
  HISTORY: 2,
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
  const { saved, setSaved, history, setHistory } = useRedux();
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
  const onAddSaved = (result) => {
    const alertNote = prompt("Note about saved entry");
    setSaved((prev) => [{ note: alertNote, result }, ...prev]);
  };

  return (
    <div className={styles["app"]}>
      <div className={styles["header"]}>
        <button
          className={classNameBuilder({ selected: page === PAGES.HOME })}
          onClick={() => setPage(PAGES.HOME)}
        >
          Roller
        </button>
        <button
          className={classNameBuilder({ selected: page === PAGES.SAVED })}
          onClick={() => setPage(PAGES.SAVED)}
        >
          Saved
        </button>
        <button
          className={classNameBuilder({ selected: page === PAGES.HISTORY })}
          onClick={() => setPage(PAGES.HISTORY)}
        >
          History
        </button>
      </div>
      <div className={styles["content"]}>
        <h1>Maze Rats Roller</h1>
        <div className={styles["buttons"]}>
          {page === PAGES.HOME && (
            <>
              <button onClick={updateRollAll}>Roll All</button>
              <button onClick={() => updateTables([])}>Clear Tables</button>
            </>
          )}
          {page === PAGES.SAVED && (
            <>
              <button onClick={() => setSaved([])}>Delete saved</button>
            </>
          )}
          {page === PAGES.HISTORY && (
            <>
              <button onClick={() => setHistory([])}>Clear History</button>
            </>
          )}
          {page === PAGES.HOME && (
            <>
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
              <span className={styles["add-table-inputs"]}>
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
              </span>
            </>
          )}
        </div>
        {page === PAGES.HISTORY && (
          <div>
            {history.map((h) =>
              Object.keys(h).length ? (
                <>
                  <div className={styles["result"]}>
                    <Results result={h} onAddSaved={onAddSaved} />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      backgroundColor: "white",
                    }}
                  />
                </>
              ) : null
            )}
            {history.length === 0 && (
              <span>Rolls from Roller page will be added here</span>
            )}
          </div>
        )}
        {page === PAGES.SAVED && (
          <div className={styles["saved-container"]}>
            {saved.map(({ note, result }, i) => {
              return (
                <div key={i}>
                  <u>
                    <h2>{note}</h2>
                  </u>
                  <Results
                    result={result}
                    onDeleteSaved={() =>
                      setSaved((prev) => prev.filter((s, curI) => curI !== i))
                    }
                  />
                </div>
              );
            })}
            {saved.length === 0 && (
              <span>
                Click 'Save Result' on Roller/History page to add rolls here
              </span>
            )}
          </div>
        )}
        {page === PAGES.HOME && (
          <>
            <div className={styles["result"]}>
              <Results
                result={result}
                onAddSaved={onAddSaved}
                onClickTag={updateForceRollByTable}
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
