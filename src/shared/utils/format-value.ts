export const formatValue = (value: number) => {
  return value.toLocaleString("de-DE", {
    maximumFractionDigits: 0,
  });
};
