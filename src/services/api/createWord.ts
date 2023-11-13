import { ServerDefaultResponse } from "./config";

interface Word {
  word: string;
  id: number;
}

export const createWord = async (word: { word: string }) => {
  const response = await fetch("http://localhost:3333/api/text/word", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(word),
  });
  const data: ServerDefaultResponse<Word> = await response.json();

  return data;
};
