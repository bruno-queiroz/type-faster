import { ServerDefaultResponse } from "./config";

export interface Progress {
  overallAverageCpm?: number;
  overallAverageTypos?: number;
  progress?:
    | {
        createdAt: string;
        cpm: number;
      }[];
}

export const getProgress = async (email: string) => {
  try {
    const response = await fetch(`http://localhost:3333/api/progress/${email}`);
    const data: ServerDefaultResponse<Progress> = await response.json();

    return data;
  } catch (err) {
    console.log("Error getting progress", err);

    const data: ServerDefaultResponse<null> = {
      data: null,
      message: "Something went wrong getting your progress.",
      isOk: false,
    };
    return data;
  }
};
