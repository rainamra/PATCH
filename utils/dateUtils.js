export const formatDayDate = (inputDate) => {
  const dateObj = new Date(inputDate);

  // Function to add leading zero if the value is less than 10
  const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  // Get day, month, and year
  const day = dateObj.getUTCDate();
  const month = addLeadingZero(dateObj.getUTCMonth() + 1); // Months are 0-indexed, so we add 1
  const year = dateObj.getUTCFullYear();

  // Get the day of the week as a string (e.g., "Monday")
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];

  // Format the day date string
  const formattedDate = `${dayOfWeek}, ${day}/${month}/${year}`;

  return formattedDate;
};

export const formatDate = (inputDate) => {
  const dateObj = new Date(inputDate);

  // Function to add leading zero if the value is less than 10
  const addLeadingZero = (value) => (value < 10 ? `0${value}` : value);

  // Get day, month, and year
  const day = dateObj.getUTCDate();
  // const month = addLeadingZero(dateObj.getUTCMonth() + 1); // Months are 0-indexed, so we add 1
  const month = dateObj.toLocaleString('default', { month: 'long' }); 
  const year = dateObj.getUTCFullYear();

  // Format the date string
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
};
