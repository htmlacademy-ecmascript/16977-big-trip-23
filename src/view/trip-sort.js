import { createElement } from '../render.js';
import { TRAVEL_SORT_ITEMS } from '../constants.js';

const createTripSortItemTemplate = (data) => `
  <div class="trip-sort__item  trip-sort__item--${data.key}">
    <input id="sort-${data.key}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      value="sort-${data.key}" ${data.checked ? 'checked' : ''}  ${data.disabled ? 'disabled' : ''}>
    <label class="trip-sort__btn" for="sort-${data.key}">${data.title}</label>
  </div>`;

const createTripSortTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${TRAVEL_SORT_ITEMS.map((item) => createTripSortItemTemplate(item)).join('')}
  </form>`;

export default class TripSort {
  getTemplate() {
    return createTripSortTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
