import { FC } from "react";
import { QueryResult } from "./AtlanSQL";
import { QueryResultTable } from "./QueryResultTable";

export type QueryListProps = {
  queries: QueryResult[];
};

export const QueryList: FC<QueryListProps> = ({ queries }) => {
  return (
    queries.length !== 0 && (
      <div className="chat-container">
        {queries.map((queryResult, index) => (
          <div key={index} className="chat-message">
            <div className="query">
              <h3>Query {index + 1}</h3>
              <pre>{queryResult.query}</pre>
            </div>
            <div className="result">
              <h4>Result:</h4>
              <QueryResultTable result={queryResult.result} />
            </div>
          </div>
        ))}
      </div>
    )
  );
};
