import AbstractView from '../framework/view/abstract-view.js';

const createTripEventMessageTemplate = ({ message }) => `<p class="trip-events__msg">${message}</p>`;

export default class TripEventMessage extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();

    this.#message = message;
  }

  get template() {
    return createTripEventMessageTemplate({ message: this.#message });
  }
}
