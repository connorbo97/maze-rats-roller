import React from "react";
import styles from "./result.module.scss";
import { TABLES } from "../constants";
import { intersection } from "lodash";
import { useRedux } from "../redux";

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

const defaultShouldRenderFunc = (result, tables) =>
  intersection(Object.keys(result), tables).length === tables.length;

export const Result = ({
  result,
  label,
  onClickTag,
  tables,
  onSave,
  shouldRender = defaultShouldRenderFunc,
}) => {
  console.log(
    label,
    result,
    tables,
    shouldRender(result, tables),
    intersection(Object.keys(result), tables).length
  );
  if (!shouldRender(result, tables)) {
    return null;
  }

  const formattedMap = {};
  tables.forEach((t) => (formattedMap[t] = (result[t] || []).join(", ")));

  const jsxResult = (
    <div>
      <div className={styles["monster"]}>
        <b>
          <u>{label}</u>
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
