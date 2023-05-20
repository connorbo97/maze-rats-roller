import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { pick, uniq } from "lodash";

const ReduxContext = createContext({});

const BaseProvider = ReduxContext.Provider;

export const useRedux = () => useContext(ReduxContext);

const SAVED_LOCAL_STORAGE_KEY = "MAZE_ROLLER_SAVED";
let initialSave = [];
try {
  initialSave = JSON.parse(localStorage.getItem(SAVED_LOCAL_STORAGE_KEY)) || [];
} catch (err) {}
export const ReduxContextProvider: any = ({ children }) => {
  const [saved, setSaved] = useState(initialSave);
  console.log(saved);
  const [rollAll, setRollAll] = useState(0);
  const [history, setHistory] = useState([]);
  const [tables, setTables] = useState([]);
  const [result, setResult] = useState({});
  const [forceRoll, setForceRoll] = useState({});

  const updateForceRollByTable = useCallback((t) => {
    setForceRoll((prev) => {
      const copy = { ...prev };
      copy[t] = (copy[t] || 0) + 1;
      return copy;
    });
  }, []);

  const updateRollAll = useCallback(() => {
    setRollAll((a) => a + 1);
  }, []);

  const updateTables = useCallback((newTables) => {
    const sanitized = uniq(newTables);
    setTables(sanitized);

    setResult((old) => pick(old, sanitized));
  }, []);

  const updateResultByKey = useCallback((k, value) => {
    if (value === null) {
      setResult((old: any) => {
        const { [k]: removed, newResult } = old;

        return newResult;
      });
    } else {
      setResult((old) => ({ ...old, [k]: value }));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_LOCAL_STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    setHistory((p) => {
      return [result, ...p];
    });
  }, [result]);

  const value = useMemo(
    () => ({
      updateRollAll,
      updateTables,
      updateResultByKey,
      updateForceRollByTable,
      setSaved,
      result,
      tables,
      tablesSet: new Set(tables),
      rollAll,
      forceRoll,
      saved,
      history,
      setHistory,
    }),
    [
      saved,
      setSaved,
      history,
      setHistory,
      forceRoll,
      result,
      rollAll,
      tables,
      updateForceRollByTable,
      updateResultByKey,
      updateRollAll,
      updateTables,
    ]
  );

  return <BaseProvider value={value}>{children}</BaseProvider>;
};
