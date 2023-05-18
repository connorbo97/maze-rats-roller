import React from "react";
import styles from "./result.module.scss";
import { TABLES } from "../constants";

const Tag = ({ val, label, table, onClick }) => {
  if (!val) {
    return null;
  }

  return (
    <span style={{ cursor: "pointer" }} onClick={() => onClick(table)}>
      <b>{label}: </b>
      {val}
    </span>
  );
};

export const Result = ({ result, onClickTag, prefix, tables, onSave }) => {
  if (Object.keys(result).every((k) => k.indexOf(prefix) === -1)) {
    return null;
  }

  const formattedMap = {};
  tables.forEach((t) => (formattedMap[t] = (result[t] || []).join(", ")));

  const jsxResult = (
    <div>
      <div className={styles["monster"]}>
        <b>
          <u>City</u>
        </b>
        <br />
        {tables.map((t) => (
          <Tag
            label={TABLES[t].label.split(": ")[1]}
            val={formattedMap[t]}
            table={t}
            onClick={onClickTag}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles["save-container"]}>
      {jsxResult}
      <button onClick={() => onSave(jsxResult)}>SAVE</button>
    </div>
  );
};
