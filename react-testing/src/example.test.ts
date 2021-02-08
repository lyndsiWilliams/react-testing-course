import { sumPositiveNumbers } from './example';

describe('when the arguments passed are positive numbers', () => {
  it('should return the right answer', () => {
    expect(sumPositiveNumbers(4, 5)).toBe(9);
  });
});

describe('when one of the arguments is a negative number', () => {
  it('should throw an error', () => {
    let error;
    try {
      sumPositiveNumbers(-1, 5);
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    expect(error.message).toBe('One of the numbers is negative');
  });
});