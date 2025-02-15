import { useState, useEffect, FC } from "react";
import initSqlJs, { Database, QueryExecResult } from "sql.js";
import sqliteUrl from "../assets/sql-wasm.wasm?url";
import { QueryList } from "./QueryList";
import { QueryTextarea } from "./QueryTextarea";

import "./AtlanSQL.css";

export type QueryExecResultArray = QueryExecResult[];

export type QueryResult = {
  query: string;
  result: QueryExecResultArray;
};

export const AtlanSQL: FC = () => {
  const [queries, setQueries] = useState<QueryResult[]>([]);
  const [editorValue, setEditorValue] = useState<string>("");

  const [db, setDb] = useState<Database | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const connect = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: () => sqliteUrl,
        });
        setDb(new SQL.Database());
      } catch (err: unknown) {
        setError(err as Error);
      }
    };
    connect();
  }, []);

  const executeQuery = () => {
    if (!editorValue.trim()) return;
    setError(null);
    try {
      if (!db) throw new Error("Database not connected");
      const res = db.exec(editorValue);
      setQueries([...queries, { query: editorValue, result: res }]);
      setEditorValue("");
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <div className="app">
      <h1>Atlan SQL Query Executor</h1>
      <QueryList queries={queries} />
      <QueryTextarea
        editorValue={editorValue}
        setEditorValue={setEditorValue}
        error={error}
      />
      <button onClick={executeQuery}>Execute</button>
    </div>
  );
};
