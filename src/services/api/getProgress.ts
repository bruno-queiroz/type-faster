import { ServerDefaultResponse, baseApiUrl } from "./config";

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
    const response = await fetch(`${baseApiUrl}/api/progress/${email}`);
    const data: ServerDefaultResponse<Progress> = await response.json();

    if (!data?.isOk) {
      throw new Error(data.message);
    }

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
