export const parseString = (string, arr) => {
  console.log(arr);

  if (typeof string !== 'string') return;
  return arr.includes(string) ? string : arr[0];
};
