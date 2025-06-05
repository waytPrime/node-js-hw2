export const parseString = (string, arr) => {
  if (typeof string !== 'string') return;
  console.log(arr);

  return arr.includes(string) ? string : arr[0];
};
