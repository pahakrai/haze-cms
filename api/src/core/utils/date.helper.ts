export const prepMonthAgo = (date: string | Date, noOfMonths = 1) => {
  const updateDate = new Date(date);
  const currentMonth = updateDate.getMonth();
  updateDate.setMonth(updateDate.getMonth() - noOfMonths);
  // If still in same month, set date to last day of
  // previous month
  if (updateDate.getMonth() === currentMonth) updateDate.setDate(0);
  updateDate.setHours(0, 0, 0);
  updateDate.setMilliseconds(0);
  return updateDate;
};
