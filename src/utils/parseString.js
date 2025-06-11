export const parseString = (string, arr) => {
  if (typeof string !== 'string') return arr[0];

  return arr.includes(string) ? string : arr[0];
};
