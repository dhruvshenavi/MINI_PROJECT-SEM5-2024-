const currentDate = new Date();
  console.log('Current Date:', currentDate);  // Debugging to check the current date

  // Use Date.setMonth() to add months. It automatically handles overflow of months > 11.
  const maturityDate = new Date(currentDate);
  maturityDate.setMonth(currentDate.getMonth() + 5);
  const formattedDate = new Date(maturityDate).toLocaleDateString('en-GB');
  console.log('Maturity Date:', formattedDate);  // Debugging to check the maturity date after adding months
