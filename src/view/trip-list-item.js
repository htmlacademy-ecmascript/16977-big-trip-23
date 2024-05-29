import AbstractView from '../framework/view/abstract-view.js';

const createTripListItemTemplate = (data) => `<li class="trip-events__item">${data}</li>`;

export default class TripListItem extends AbstractView {
  #data = null;

  #rollupButton = null;
  #formEventEdit = null;
  #favoriteButton = null;

  #handleRollupClick = null;
  #handleFormSubmit = null;
  #handleSwitchFavorite = null;

  constructor({ data, onRollupClick, onFormSubmit, onFavoriteClick }) {
    super();
    this.#data = data;

    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleSwitchFavorite = onFavoriteClick;

    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#formEventEdit = this.element.querySelector('.event--edit');
    this.#favoriteButton = this.element.querySelector('.event__favorite-btn');


    if (this.#rollupButton) {
      this.#rollupButton.addEventListener('click', this.#rollupClickHandler);
    }

    if (this.#formEventEdit) {
      this.#formEventEdit.addEventListener('submit', this.#formSubmitHandler);
    }

    if (this.#favoriteButton) {
      this.#favoriteButton.addEventListener('click', this.#switchFavoriteHandler);
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

  #switchFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleSwitchFavorite();
  };
}
