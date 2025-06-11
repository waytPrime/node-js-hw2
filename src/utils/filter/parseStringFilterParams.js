export const parseStringFilterParams = (string, arr) => {
  if (typeof string !== 'string') return;
  if (!arr.includes(string)) return;

  return string;
};
