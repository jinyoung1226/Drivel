const isThisWeek = date => {
  const today = new Date();
  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay())
  );
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );
  const d = new Date(date);
  return d >= startOfWeek && d <= endOfWeek;
};

export default isThisWeek;