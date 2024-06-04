import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import FormBuilder from '../../util/form-builder.js';
import TripListItem from '../trip-list-item.js';

export default class FormEditPoint extends AbstractStatefulView {
  #point = [];
  #currentDestination = [];
  #currentOffers = [];
  #mainOffers = [];
  #mainDestinations = [];

  #rollupButton = null;
  #formEventEdit = null;

  #handleRollupClick = null;
  #handleFormSubmit = null;

  constructor({ point, currentDestination, currentOffers, mainOffers, mainDestinations, onRollupClick, onFormSubmit }) {
    super();
    this.#point = point;
    this.#currentDestination = currentDestination;
    this.#currentOffers = currentOffers;
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;

    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;

    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#formEventEdit = this.element.querySelector('.event--edit');


    if (this.#rollupButton) {
      this.#rollupButton.addEventListener('click', this.#rollupClickHandler);
    }

    if (this.#formEventEdit) {
      this.#formEventEdit.addEventListener('submit', this.#formSubmitHandler);
    }
  }

  get template() {
    const tripFormEditPoint = new FormBuilder({
      point: this.#point,
      currentDestination: this.#currentDestination,
      currentOffers: this.#currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations
    }).getFormPointTemplate();

    return new TripListItem({ data: tripFormEditPoint }).template;
  }

  _restoreHandlers() { }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };
}
