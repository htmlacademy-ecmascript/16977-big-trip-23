import AbstractView from '../framework/view/abstract-view.js';

const createTripListItemTemplate = (data) => `<li class="trip-events__item">${data}</li>`;

export default class TripListItem extends AbstractView {
  #data = null;

  #rollupButton = null;
  #formEventEdit = null;

  #handleRollupClick = null;
  #handleFormSubmit = null;

  constructor({ data, onRollupClick, onFormSubmit }) {
    super();
    this.#data = data;

    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;

    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#formEventEdit = this.element.querySelector('.event--edit');


    if (this.#rollupButton) {
      this.#rollupButton.addEventListener('click', this.#rollupClickHandler);
    }

    if (this.#formEventEdit) {
      this.#formEventEdit.addEventListener('submit', this.#formSubmitHandler);
    }
  }

  get template() {
    return createTripListItemTemplate(this.#data);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
