export interface Typo {
  word: string;
  typingHistoryIndex: number;
}

export const customSet = (): [Typo[], (typo: Typo) => void] => {
  const set = new Set<string>();
  const typos: Typo[] = [];

  return [
    typos,
    (typo: Typo) => {
      if (!set.has(typo.word)) {
        typos.push(typo);
        set.add(typo.word);
      }
    },
  ];
};
