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
import { getTableLabel } from "../constants/tableLabels";
import { TABLE_CONFIGS } from "../constants/tables";

const classNameBuilder = classnames.bind(styles);

export const Table = ({ table, tableName }) => {
  const { rollAll, updateResultByKey, updateTables, tables } = useRedux();
  const initialRollAll = useRef(rollAll);
  const [rollGroup, setRollGroup] = useState(null);
  const [rollValue, setRollValue] = useState(null);

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

  const onRoll = useCallback(() => {
    const newRollGroup = Math.floor(Math.random() * Object.keys(table).length);
    const newRollValue = Math.floor(
      Math.random() * table[Object.keys(table)[newRollGroup]].length
    );
    setRollGroup(newRollGroup);
    setRollValue(newRollValue);
    let value = Object.values(table)[newRollGroup][newRollValue];

    if (TABLE_CONFIGS[tableName]?.calculateValue) {
      value = TABLE_CONFIGS[tableName].calculateValue(value);
    }

    updateResultByKey(tableName, value);
  }, [table, tableName, updateResultByKey]);

  const onDelete = () => {
    updateTables(tables.filter((t) => t !== tableName));
  };

  useEffect(() => {
    if (rollAll !== initialRollAll.current) {
      onRoll();
    }
  }, [rollAll, onRoll]);

  return (
    <div className={styles["container"]}>
      <div className={styles["head"]}>
        <b>{getTableLabel(table)}</b>
        <button onClick={onRoll}>Roll</button>
        <button onClick={onDelete}>Delete</button>
      </div>
      <table className={styles["table"]}>
        <thead>
          <tr>
            {Object.keys(table).map((k, i) => (
              <th
                key={k}
                className={classNameBuilder({ selected: rollGroup === i })}
              >
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {modifiedTable.map((row, rowI) => {
            return (
              <tr key={rowI}>
                {row.map((val, valI) => (
                  <td
                    key={valI}
                    className={classNameBuilder({
                      selected: rollValue === rowI && rollGroup === valI,
                      "selected-group": rollGroup === valI,
                    })}
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
