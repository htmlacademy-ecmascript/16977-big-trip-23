import { createElement } from '../render.js';

const createTripListContainerTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

export default class TripListContainer {
  getTemplate() {
    return createTripListContainerTemplate();
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
