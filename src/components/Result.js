import React, { useState } from "react";
import styles from "./result.module.scss";
import { CHARACTER_PROPERTY_TO_FLAVOR_TEXT, TABLES } from "../constants";
import { intersection, noop } from "lodash";
import { useRedux } from "../redux";
import classnames from "classnames/bind";

const classNameBuilder = classnames.bind(styles);

const copyToClipboard = (text) => {
  // Get the text field
  // const copyText = document.createElement("input");
  // copyText.value = text;

  // console.log(copyText.value);
  // // Select the text field
  // copyText.select();
  // copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(text);
};

const Cell = ({ val, label, onClick, onDeleteTable }) => {
  if (!val) {
    return null;
  }

  return (
    <div className={styles["cell"]}>
      <div className={styles["cell-header"]}>
        <span>{label}</span>
        <div className={styles["btn-container"]}>
          {onClick && (
            <button className={styles["roll-btn"]} onClick={onClick}>
              &#9851;
            </button>
          )}
          {onDeleteTable && (
            <button className={styles["delete-btn"]} onClick={onDeleteTable}>
              X
            </button>
          )}
        </div>
      </div>
      <div className={styles["cell-value"]} onClick={onClick || noop}>
        {val}
      </div>
    </div>
  );
};

export const allMatchShouldRenderFunc = (result, tables) =>
  intersection(Object.keys(result), tables).length === tables.length;
export const partialShouldRenderFunc = (result, tables) =>
  intersection(Object.keys(result), tables).length > 0;
export const prefixMatchShouldRenderFunc = (prefix) => (result, tables) =>
  Object.keys(result).find((v) => v.indexOf(prefix) === 0);
const defaultShouldRenderFunc = partialShouldRenderFunc;
const getDefaultRenderBottomText = (formattedMap, tables, separator = " || ") =>
  tables
    .map((t) => `${TABLES[t].label.split(": ")[1]}: ${formattedMap[t]}`)
    .join(separator);
const defaultRenderBottomText = (formattedMap, tables) => (
  <div>
    <br />
    <b>SUMMARY: </b>
    <span>{getDefaultRenderBottomText(formattedMap, tables)}</span>
  </div>
);

export const Result = ({
  result,
  label,
  onClickTag,
  tables,
  renderBottomText = defaultRenderBottomText,
  shouldRender = defaultShouldRenderFunc,
}) => {
  const [hide, setHide] = useState(false);
  const { updateTables, tables: reduxTables } = useRedux();
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
      <div className={styles["header"]}>
        <b>
          <u>{label}</u>
        </b>

        <button
          onClick={() =>
            copyToClipboard(
              getDefaultRenderBottomText(formattedMap, tables, "\n")
            )
          }
        >
          Copy
        </button>
        <button onClick={() => setHide((h) => !h)}>
          {hide ? "Show" : "Hide"}
        </button>
      </div>
      <div className={classNameBuilder("table", { hidden: hide })}>
        {tables.map((t) => (
          <Cell
            label={TABLES[t].label.split(": ")[1]}
            val={formattedMap[t]}
            onClick={onClickTag && (() => onClickTag(t))}
            onDeleteTable={
              onClickTag &&
              (() => updateTables(reduxTables.filter((v) => v !== t)))
            }
          />
        ))}
      </div>
      {!hide && renderBottomText(formattedMap, tables, result)}
    </div>
  );

  return <div className={styles["save-container"]}>{jsxResult}</div>;
};
