import AbstractView from '../../framework/view/abstract-view.js';
import FormBuilder from '../../util/form-builder.js';

export default class FormEditPoint extends AbstractView {
  #point = null;
  #currentDestination = null;
  #currentOffers = [];
  #mainOffers = [];
  #mainDestinations = [];

  constructor({ point, currentDestination, currentOffers, mainOffers, mainDestinations }) {
    super();
    this.#point = point;
    this.#currentDestination = currentDestination;
    this.#currentOffers = currentOffers;
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;
  }

  get template() {
    return new FormBuilder({
      point: this.#point,
      currentDestination: this.#currentDestination,
      currentOffers: this.#currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations
    }).getFormPointTemplate();
  }
}
