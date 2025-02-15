import { FC } from "react";
import { QueryExecResultArray } from "./AtlanSQL";

export type QueryResultTableProps = { result: QueryExecResultArray };

export const QueryResultTable: FC<QueryResultTableProps> = ({ result }) => {
  if (result.length === 0) return <div>No results</div>;

  const columns = result[0].columns;
  const values = result[0].values;

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col: string, index: number) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {values.map((row, rowIndex: number) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex: number) => (
              <td key={colIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
