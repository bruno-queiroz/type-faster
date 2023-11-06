export const formatDate = (date?: string) => {
  if (!date) return "";

  const [relevantDate] = date?.split("T");
  return relevantDate;
};
