import { destinations } from '../mock/destinations.js';

export default class DestinationsModel {
  #destinations = destinations;

  get destinations() {
    return this.#destinations;
  }

  getDestinationByID(point) {
    return this.#destinations.find((destination) => destination.id === point.destination);
  }
}
