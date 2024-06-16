const showMistakeStateField = (element) => {
  element.classList.add('state-mistake-field');

  setTimeout(() => {
    element.classList.remove('state-mistake-field');
  }, 1000);
};

const addZeroToNumber = (num) => num.length > 1 ? num : `0${num}`;

export { showMistakeStateField, addZeroToNumber };
