const showMistakeStateField = (element) => {
  element.classList.add('state-mistake-field');

  setTimeout(() => {
    element.classList.remove('state-mistake-field');
  }, 1000);
};

export { showMistakeStateField };
