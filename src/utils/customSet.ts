export interface Typo {
  word: string;
  typingHistoryIndex: number;
}

export const customSet = (): [Typo[], (typo: Typo) => void, () => void] => {
  const set = new Set<string>();
  let typos: Typo[] = [];

  const clearSet = () => {
    typos = [];
    set.clear();
  };

  return [
    typos,
    (typo: Typo) => {
      if (!set.has(typo.word)) {
        typos.push(typo);
        set.add(typo.word);
      }
    },
    clearSet,
  ];
};
