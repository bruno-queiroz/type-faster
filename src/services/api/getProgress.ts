import { ServerDefaultResponse } from "./config";

export interface Progress {
  overallAverageCpm: number;
  overallAverageTypos: number;
  progress: {
    createdAt: string;
    cpm: number;
  }[];
}

export const getProgress = async (email: string) => {
  const response = await fetch(`http://localhost:3333/api/progress/${email}`);
  const data: ServerDefaultResponse<Progress> = await response.json();

  return data;
};
