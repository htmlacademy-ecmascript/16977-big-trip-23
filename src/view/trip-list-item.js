import AbstractView from '../framework/view/abstract-view.js';

const createTripListItemTemplate = (data) => `<li class="trip-events__item">${data}</li>`;

export default class TripListItem extends AbstractView {
  #data = null;

  constructor({ data }) {
    super();
    this.#data = data;
  }

  get template() {
    return createTripListItemTemplate(this.#data);
  }
}
