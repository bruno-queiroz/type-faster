import { ServerDefaultResponse } from "./config";

interface Text {
  author: string;
  id: string;
  image: string;
  text: string[];
  title: string;
}

export const getText = async () => {
  const response = await fetch("http://localhost:3333/api/text");
  const data: ServerDefaultResponse<Text> = await response.json();

  return data?.data;
};
