import { getURLParam } from "@/utils/getURLParam";
import { ServerDefaultResponse } from "./config";

interface Text {
  mode: "traditional" | "repeated-words";
  author: string;
  id: string;
  image: string;
  text: string[];
  title: string;
}

export const getText = async () => {
  const mode = getURLParam("mode");
  const response = await fetch(`http://localhost:3333/api/text?mode=${mode}`);
  const data: ServerDefaultResponse<Text> = await response.json();

  return data?.data;
};
