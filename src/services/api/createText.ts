interface Text {
  text: string;
  title: string;
  author: string;
  image: string | null;
}

export const createText = async (text: Text) => {
  const response = await fetch("http://localhost:3333/api/text", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(text),
  });

  const data = await response.json();

  return data;
};
