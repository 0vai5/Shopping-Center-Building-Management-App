const getMonth = (time: "current" | "previous"): string => {

  if (time === "current") {
    const month = new Date().toLocaleString("default", {
      month: "long"
    });
    const year = new Date().getFullYear();

    return `${month} ${year}`;
  }

  const previousDate = new Date();
  previousDate.setDate(1);
  previousDate.setMonth(previousDate.getMonth() - 1);

  return `${previousDate.toLocaleString("default", {
    month: "long",
  })} ${previousDate.getFullYear()}`;

};


export default getMonth