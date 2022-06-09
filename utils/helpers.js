module.exports = {
  format_date: (date) => {
  console.log('date');
    return `${new Date(date).toLocaleString()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  is_greater: (one, two) => {
    return one > two;
  }
};