export const parseString = (sortBy, array) => {
  if (typeof sortBy !== "string") return;
  return array.includes(sortBy) ? sortBy : undefined;
};
