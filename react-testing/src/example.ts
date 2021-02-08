export const sumPositiveNumbers = (num1: number, num2: number) => {
  if(num1 < 0 || num2 < 0) {
    throw new Error('One of the numbers is negative');
  };
  return num1 + num2;
};
