import { createElement } from '../../render.js';
import FormBuilder from '../../util/form-builder.js';

export default class FormEditPoint {
  constructor({ point, currentDestination, currentOffers, mainOffers, mainDestinations }) {
    this.point = point;
    this.currentDestination = currentDestination;
    this.currentOffers = currentOffers;
    this.mainOffers = mainOffers;
    this.mainDestinations = mainDestinations;
  }

  getTemplate() {
    return new FormBuilder({
      point: this.point,
      currentDestination: this.currentDestination,
      currentOffers: this.currentOffers,
      mainOffers: this.mainOffers,
      mainDestinations: this.mainDestinations
    }).getFormPointTemplate();
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
