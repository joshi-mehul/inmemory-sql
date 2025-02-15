import { SQL_KEYWORDS } from "./constants";

export const getSugessions = (value: string): string[] => {
  const lastWord = value.split(/\s+/).pop();
  if (lastWord) {
    const filteredSuggestions = SQL_KEYWORDS.filter((keyword) =>
      keyword.toLowerCase().startsWith(lastWord.toLowerCase())
    );
    return filteredSuggestions;
  }
  return [];
};
