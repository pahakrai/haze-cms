export const castRatingToDisplay = (dbValue: number, max = 5): number => {
  if (dbValue > 100) {
    throw new Error('invalid input');
  }

  return (dbValue / 100) * max;
};

export const castRatingToDbValue = (displayValue: number, max = 5): number => {
  if (displayValue > max) {
    throw new Error('invalid input');
  }

  return (displayValue / max) * 100;
};
