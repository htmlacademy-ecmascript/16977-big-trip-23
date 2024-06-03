import AbstractView from '../framework/view/abstract-view.js';
import { TravelSortItems } from '../constants.js';

const createTripSortItemTemplate = (data) => `
    <div class="trip-sort__item  trip-sort__item--${data.fieldName}">
      <input id="sort-${data.fieldName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
        value="sort-${data.fieldName}" ${data.checked ? 'checked' : ''}  ${data.fieldStatus === 'off' ? 'disabled' : ''} data-field-name="${data.fieldName}">
      <label class="trip-sort__btn" for="sort-${data.fieldName}">${data.fieldTitle}</label>
    </div>`;

const createTripSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(TravelSortItems).map((item) => createTripSortItemTemplate(item)).join('')}
  </form>`;

export default class TripSort extends AbstractView {
  #handleTripSortChange = null;

  constructor({ onTripSortChange }) {
    super();

    this.#handleTripSortChange = onTripSortChange;

    this.element.addEventListener('change', this.#tripSortChangeHandler);
  }

  get template() {
    return createTripSortTemplate();
  }

  #tripSortChangeHandler = (evt) => {
    evt.preventDefault();

    const type = evt.target.dataset.fieldName;

    this.#handleTripSortChange(type);
  };
}
