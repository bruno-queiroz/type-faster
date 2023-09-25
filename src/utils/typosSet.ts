export interface Typo {
  word: string;
  typingHistoryIndex: number;
}

export const typosSet = (): [
  () => Typo[],
  (typo: Typo) => void,
  () => void
] => {
  const set = new Set<string>();
  let typos: Typo[] = [];

  const addTypo = (typo: Typo) => {
    if (!set.has(typo.word)) {
      typos.push(typo);
      set.add(typo.word);
    }
  };

  const clearTypos = () => {
    typos = [];
    set.clear();
  };

  return [() => typos, addTypo, clearTypos];
};
