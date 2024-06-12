import { FiltersType, FilterMessage } from '../constants.js';
import AbstractView from '../framework/view/abstract-view.js';

const createTripEmptyTemplate = (message) => `<p class="trip-events__msg">${message}</p>`;

export default class TripEmpty extends AbstractView {
  #message = null;

  constructor({ message = FilterMessage[FiltersType.EVERYTHING] }) {
    super();

    this.#message = message;
  }

  get template() {
    return createTripEmptyTemplate(this.#message);
  }
}
