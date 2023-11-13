import { createWord } from "@/services/api/createWord";
import { useState } from "react";

export const useSubmitWord = () => {
  const [word, setWord] = useState("");

  const handleSubmitWord = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      word,
    };

    const response = await createWord(body);
    if (response.isOk) {
      setWord("");
    }
  };

  return {
    handleSubmitWord,
    word,
    setWord,
  };
};
