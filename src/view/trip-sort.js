import AbstractView from '../framework/view/abstract-view.js';
import { TravelSortItem } from '../constants.js';

const createTripSortItemTemplate = (data, currentSortType) => `
    <div class="trip-sort__item  trip-sort__item--${data.fieldName}">
      <input id="sort-${data.fieldName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
        value="sort-${data.fieldName}" ${data.fieldName === currentSortType ? 'checked' : ''}  ${data.fieldStatus === 'off' ? 'disabled' : ''} data-field-name="${data.fieldName}">
      <label class="trip-sort__btn" for="sort-${data.fieldName}">${data.fieldTitle}</label>
    </div>`;

const createTripSortTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(TravelSortItem).map((item) => createTripSortItemTemplate(item, currentSortType)).join('')}
  </form>`;

export default class TripSort extends AbstractView {
  #currentSortType = null;
  #handleTripSortChange = null;

  constructor({ currentSortType, onTripSortChange }) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleTripSortChange = onTripSortChange;

    this.element.addEventListener('change', this.#tripSortChangeHandler);
  }

  get template() {
    return createTripSortTemplate(this.#currentSortType);
  }

  #tripSortChangeHandler = (evt) => {
    evt.preventDefault();

    const type = evt.target.dataset.fieldName;

    this.#handleTripSortChange(type);
  };
}
