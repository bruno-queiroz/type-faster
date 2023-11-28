import { ServerDefaultResponse, baseApiUrl } from "./config";

interface Ranking {
  cpm: number;
  createdAt: string;
  user: {
    name: string;
  };
}

export const getRanking = async (textId: string) => {
  const response = await fetch(`${baseApiUrl}/api/ranking/${textId}`, {
    cache: "no-cache",
  });
  const data: ServerDefaultResponse<Ranking[]> = await response.json();

  return data;
};
