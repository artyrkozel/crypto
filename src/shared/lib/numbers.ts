export const round = (num: number, digits: number = 5): number => Number(Number(num).toFixed(digits));

export const numMask = (value: number, digits: number = 5) => {
  return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: digits }).format(
    value,
  );
};
