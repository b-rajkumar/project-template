const sumOfNumbers = function(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
};

const max = function(numbers) {
  let max = numbers[0];
  for (const number of numbers) {
    max = (max < number) ? number : max; 
  }
  return max;
}



exports.max = max;
exports.sumOfNumbers = sumOfNumbers;
