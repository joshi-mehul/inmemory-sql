import { FC, useRef, useState } from "react";
import { getSugessions } from "../utils";

export type QueryTextareaProps = {
  error: Error | null;
  editorValue: string;
  setEditorValue: (editorValue: string) => void;
};

export const QueryTextarea: FC<QueryTextareaProps> = ({
  error,
  editorValue,
  setEditorValue,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEditorValue(value);
    setSuggestions(getSugessions(value));
  };

  const handleSuggestionClick = (suggestion: string) => {
    const words = editorValue.split(/\s+/);
    words.pop();
    const newValue = [...words, suggestion].join(" ") + " ";
    setEditorValue(newValue);
    setSuggestions([]);
    textareaRef.current?.focus();
  };

  return (
    <div className="editor-container">
      <textarea
        ref={textareaRef}
        className="editor"
        value={editorValue}
        onChange={handleInputChange}
        rows={5}
        cols={50}
        placeholder="Enter SQL Query"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};
