export const parseNumber = (number) => {
  if (typeof number !== 'string') return;
  const parseInteger = parseInt(number);

  return isNaN(parseInt) ? parseInteger : undefined;
};
