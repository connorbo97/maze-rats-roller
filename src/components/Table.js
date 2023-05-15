import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./table.module.scss";
import { useRedux } from "../redux";
import classnames from "classnames/bind";
import { TABLES, getTableLabel } from "../constants/tables";

const classNameBuilder = classnames.bind(styles);

const has = (arr, val) => new Set(arr).has(val);
const checkSelected = (rollGroup, rollValue, rowI, valI) => {
  return (rollGroup || []).some(
    (r, i) => r === valI && (rollValue || [])[i] === rowI
  );
};

export const Table = ({ table, tableName }) => {
  const { rollAll, updateResultByKey, updateTables, tables } = useRedux();
  const initialRollAll = useRef(rollAll);
  const [lock, setLock] = useState(false);
  const [rollGroup, setRollGroup] = useState(null);
  const [rollValue, setRollValue] = useState(null);
  const [numRolls, setNumRolls] = useState(
    TABLES[tableName].defaultNumRolls || 1
  );

  const modifiedTable = useMemo(() => {
    const twoDTable = [];

    Object.entries(table).forEach(([g, v], groupI) => {
      v.forEach((val, valI) => {
        if (!twoDTable[valI]) {
          twoDTable[valI] = [];
        }
        twoDTable[valI][groupI] = val;
      });
    });

    return twoDTable;
  }, [table]);

  const updateRolls = useCallback(
    (newRollGroup, newRollValue) => {
      setRollGroup(newRollGroup);
      setRollValue(newRollValue);
      let value = [];

      for (let i = 0; i < numRolls; i++) {
        value[i] = Object.values(table)[newRollGroup[i]][newRollValue[i]];
      }

      updateResultByKey(tableName, value);
    },
    [numRolls, table, tableName, updateResultByKey]
  );

  const onRoll = useCallback(() => {
    if (lock) {
      return;
    }
    const newRollGroup = [];
    const newRollValue = [];
    for (let i = 0; i < numRolls; i++) {
      newRollGroup[i] = Math.floor(Math.random() * Object.keys(table).length);
      newRollValue[i] = Math.floor(
        Math.random() * table[Object.keys(table)[newRollGroup[i]]].length
      );
    }

    updateRolls(newRollGroup, newRollValue);
  }, [lock, numRolls, table, updateRolls]);

  const onDelete = () => {
    updateTables(tables.filter((t) => t !== tableName));
  };

  const onChangeNumRolls = (e) => {
    setNumRolls(e.target.value);
  };

  useEffect(() => {
    if (rollAll !== initialRollAll.current) {
      onRoll();
    }
  }, [rollAll, onRoll]);

  return (
    <div className={styles["container"]}>
      <div className={styles["head"]}>
        <b>{getTableLabel(tableName)}</b>
        <button onClick={onRoll}>Roll</button>
        <button onClick={onDelete}>Delete</button>
        <button
          onClick={() => setLock((l) => !l)}
          className={classNameBuilder({ locked: lock })}
        >
          {lock ? "Unlock" : "Lock"}
        </button>
        {TABLES[tableName].maxNumRolls !== 1 && (
          <input
            type="number"
            value={numRolls}
            min={1}
            max={TABLES[tableName].maxNumRolls}
            onChange={onChangeNumRolls}
          />
        )}
      </div>
      <table className={styles["table"]}>
        {/* <thead>
          <tr>
            {Object.keys(table).map((k, i) => (
              <th
                key={k}
                className={classNameBuilder({ selected: has(rollGroup, i) })}
              >
                {k}
              </th>
            ))}
          </tr>
        </thead> */}
        <tbody>
          {modifiedTable.map((row, rowI) => {
            return (
              <tr key={rowI}>
                {row.map((val, valI) => (
                  <td
                    key={valI}
                    className={classNameBuilder({
                      selected: checkSelected(rollGroup, rollValue, rowI, valI),
                      "selected-group": has(rollGroup, valI),
                    })}
                    onClick={() => {
                      const rollGroupArr = [];
                      const rollValueArr = [];

                      for (let i = 0; i < numRolls; i++) {
                        rollGroupArr[i] = valI;
                        rollValueArr[i] = rowI;
                      }

                      updateRolls(rollGroupArr, rollValueArr);
                    }}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
