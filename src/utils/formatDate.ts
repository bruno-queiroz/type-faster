export const formatDate = (date: string) => {
  const [relevantDate] = date.split("T");
  return relevantDate;
};
