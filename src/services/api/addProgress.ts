interface TypingData {
  textId: string;
  cpm: string;
  email: string;
}

export const addProgress = async (typingData: TypingData) => {
  const response = await fetch("http://localhost:3333/api/progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(typingData),
  });
  const data = await response.json();

  return data;
};
