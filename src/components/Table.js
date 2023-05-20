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

const getDisableValuesKey = (r, c) => `${r}:${c}`;

export const Table = ({ table, tableName }) => {
  const {
    rollAll,
    updateResultByKey,
    updateTables,
    tables,
    forceRoll: forceRollObj,
    lockedTables,
    toggleLockedTable,
  } = useRedux();
  const forceRoll = forceRollObj[tableName] || 0;
  const rollAllRef = useRef(rollAll);
  const forceRollRef = useRef(forceRoll);
  const lock = !!lockedTables[tableName];
  const [disableMode, setDisableMode] = useState(false);
  const [disableValues, setDisableValues] = useState(false);
  const [rollGroup, setRollGroup] = useState(null);
  const [rollValue, setRollValue] = useState(null);
  const [insertOrder, setInsertOrder] = useState(0);
  const [numRolls, setNumRolls] = useState(
    TABLES[tableName].defaultNumRolls || 1
  );

  useEffect(() => {
    setInsertOrder(0);
  }, [numRolls]);

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
      do {
        newRollGroup[i] = Math.floor(Math.random() * Object.keys(table).length);
        newRollValue[i] = Math.floor(
          Math.random() * table[Object.keys(table)[newRollGroup[i]]].length
        );

        if (
          !disableValues[getDisableValuesKey(newRollValue[i], newRollGroup[i])]
        )
          break;
      } while (true);
    }

    updateRolls(newRollGroup, newRollValue);
  }, [disableValues, lock, numRolls, table, updateRolls]);

  const onDelete = () => {
    updateTables(tables.filter((t) => t !== tableName));
  };

  const onChangeNumRolls = (e) => {
    setNumRolls(e.target.value);
  };

  useEffect(() => {
    if (rollAll !== rollAllRef.current || forceRoll !== forceRollRef.current) {
      onRoll();
      rollAllRef.current = rollAll;
      forceRollRef.current = forceRoll;
    }
  }, [rollAll, onRoll, forceRoll, forceRollRef]);

  return (
    <div className={styles["container"]}>
      <div className={styles["head"]}>
        <b>{getTableLabel(tableName)}</b>
        <button onClick={onRoll}>Roll</button>
        <button onClick={onDelete}>Delete</button>
        <button
          onClick={() => setDisableMode((m) => !m)}
          className={classNameBuilder({ disabling: disableMode })}
        >
          {disableMode ? "Disable Mode" : "Select Mode"}
        </button>
        {Object.values(disableValues).some((v) => !!v) && (
          <button onClick={() => setDisableValues({})}>Clear disabled</button>
        )}
        <button
          onClick={() => toggleLockedTable(tableName)}
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
                      disabled: disableValues[getDisableValuesKey(rowI, valI)],
                    })}
                    onClick={() => {
                      if (disableMode) {
                        setDisableValues((prev) => ({
                          ...prev,
                          [getDisableValuesKey(rowI, valI)]:
                            !prev[getDisableValuesKey(rowI, valI)],
                        }));
                        return;
                      }
                      let rollGroupArr = [];
                      let rollValueArr = [];

                      if (!rollGroup || !rollValue) {
                        for (let i = 0; i < numRolls; i++) {
                          rollGroupArr[i] = valI;
                          rollValueArr[i] = rowI;
                        }
                      } else {
                        rollGroupArr = [...rollGroup];
                        rollValueArr = [...rollValue];
                      }

                      rollGroupArr[insertOrder] = valI;
                      rollValueArr[insertOrder] = rowI;

                      setInsertOrder((prev) => (prev + 1) % numRolls);
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
