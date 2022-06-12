module.exports = {
  format_date: (date) => {
    console.log("date");
    return `${new Date(date).toLocaleString()}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  if_equal: (postCat, catOption, opts) => {
    return postCat === catOption ? opts.fn(this) : opts.inverse(this);
  },
  is_greater: (one, two) => {
    return one > two;
  },
};
