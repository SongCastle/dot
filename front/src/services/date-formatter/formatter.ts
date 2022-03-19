export const formatDate = (str: string) => {
  const date = new Date(str);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleString();
};
