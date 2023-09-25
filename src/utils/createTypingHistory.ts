export interface TypingHistory {
  value: string;
  time: number;
  isDeleteContent: boolean;
  startPoint: number;
  deletedAmount: number;
  cpm: string;
  accuracy: string;
  isCorrect: boolean;
}

type PushToHistory = Omit<TypingHistory, "time" | "value"> & {
  value: null | string;
};

export const createTypingHistory = (): [
  () => TypingHistory[],
  (data: PushToHistory) => void,
  () => void
] => {
  let typingHistory: TypingHistory[] = [];

  const pushToHistory = (data: PushToHistory) => {
    typingHistory.push({
      ...data,
      value: data.value || "Backspace",
      time: new Date().getTime(),
    });
  };

  const clearTypingHistory = () => {
    typingHistory = [];
  };

  return [() => typingHistory, pushToHistory, clearTypingHistory];
};
