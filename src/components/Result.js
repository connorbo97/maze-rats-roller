import React from "react";
import styles from "./result.module.scss";
import { CHARACTER_PROPERTY_TO_FLAVOR_TEXT, TABLES } from "../constants";
import { intersection } from "lodash";

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

export const allMatchShouldRenderFunc = (result, tables) =>
  intersection(Object.keys(result), tables).length === tables.length;
export const partialShouldRenderFunc = (result, tables) =>
  intersection(Object.keys(result), tables).length > 0;
export const prefixMatchShouldRenderFunc = (prefix) => (result, tables) =>
  Object.keys(result).find((v) => v.indexOf(prefix) !== -1);
const defaultShouldRenderFunc = partialShouldRenderFunc;
const defaultRenderBottomText = (formattedMap, tables) => (
  <div>
    <br />
    <b>SUMMARY: </b>
    <span>
      {tables
        .map((t) => `${TABLES[t].label.split(": ")[1]}: ${formattedMap[t]}`)
        .join(" || ")}
    </span>
  </div>
);

export const Result = ({
  result,
  label,
  onClickTag,
  tables,
  onSave,
  renderBottomText = defaultRenderBottomText,
  shouldRender = defaultShouldRenderFunc,
}) => {
  if (!shouldRender(result, tables)) {
    return null;
  }

  const formattedMap = {};
  tables.forEach(
    (t) =>
      (formattedMap[t] = (result[t] || [])
        .map((v) => CHARACTER_PROPERTY_TO_FLAVOR_TEXT[v] || v)
        .join(", "))
  );

  const jsxResult = (
    <div className={styles["container"]}>
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
      {renderBottomText(formattedMap, tables)}
    </div>
  );

  return (
    <div className={styles["save-container"]}>
      {jsxResult}
      <button onClick={() => onSave(jsxResult)}>SAVE</button>
    </div>
  );
};
