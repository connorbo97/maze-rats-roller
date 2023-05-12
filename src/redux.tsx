import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { pick, uniq } from "lodash";

const ReduxContext = createContext({});

const BaseProvider = ReduxContext.Provider;

export const useRedux = () => useContext(ReduxContext);

export const ReduxContextProvider: any = ({ children }) => {
  const [rollAll, setRollAll] = useState(0);
  const [tables, setTables] = useState([]);
  const [result, setResult] = useState({});

  const updateRollAll = useCallback(() => {
    setRollAll((a) => a + 1);
  }, []);

  const updateTables = useCallback((newTables) => {
    const sanitized = uniq(newTables);
    setTables(sanitized);

    setResult((old) => pick(old, sanitized));
  }, []);

  const updateResultByKey = useCallback((k, value) => {
    setResult((old) => ({ ...old, [k]: value }));
  }, []);

  const value = useMemo(
    () => ({
      updateRollAll,
      updateTables,
      updateResultByKey,
      result,
      tables,
      tablesSet: new Set(tables),
      rollAll,
    }),
    [result, rollAll, tables, updateResultByKey, updateRollAll, updateTables]
  );

  return <BaseProvider value={value}>{children}</BaseProvider>;
};
