export const getText = async () => {
  const response = await fetch("http://localhost:3333/api/text");
  const data = response.json();

  return data;
};
