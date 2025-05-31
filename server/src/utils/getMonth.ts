const getMonth = (time: "previous" | "current"): string => {
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  switch (time) {
    case "previous":
      const previousDate = new Date();
      previousDate.setDate(1);
      previousDate.setMonth(previousDate.getMonth() - 1);

      return `${previousDate.toLocaleString("default", {
        month: "long",
      })} ${previousDate.getFullYear()}`;
    case "current":
      return `${currentMonth} ${currentYear}`;
    default:
      throw new Error("Invalid time parameter. Use 'previous' or 'current'.");
  }
};

export default getMonth;
