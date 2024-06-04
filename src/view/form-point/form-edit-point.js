import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import FormBuilder from '../../util/form-builder.js';
import TripListItem from '../trip-list-item.js';

export default class FormEditPoint extends AbstractStatefulView {
  #mainOffers = [];
  #mainDestinations = [];

  #rollupButton = null;
  #formEventEdit = null;
  #eventTypeGroup = null;
  #eventInputDestination = null;

  #handleRollupClick = null;
  #handleFormSubmit = null;

  constructor({ point, currentDestination, currentOffers, mainOffers, mainDestinations, onRollupClick, onFormSubmit }) {
    super();
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;

    this._setState({
      point: { ...point },
      currentDestination: { ...currentDestination },
      currentOffers: [...currentOffers],
    });

    this.#handleRollupClick = onRollupClick;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    const tripFormEditPoint = new FormBuilder({
      point: this._state.point,
      currentDestination: this._state.currentDestination,
      currentOffers: this._state.currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations
    }).getFormPointTemplate();

    return new TripListItem({ data: tripFormEditPoint }).template;
  }

  reset({ point, currentDestination, currentOffers }) {
    this.updateElement({
      point: { ...point },
      currentDestination: { ...currentDestination },
      currentOffers: [...currentOffers],
    });
  }

  _restoreHandlers() {
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#formEventEdit = this.element.querySelector('.event--edit');
    this.#eventTypeGroup = this.element.querySelector('.event__type-group');
    this.#eventInputDestination = this.element.querySelector('.event__input--destination');

    this.#rollupButton.addEventListener('click', this.#rollupClickHandler);
    this.#formEventEdit.addEventListener('submit', this.#formSubmitHandler);
    this.#eventTypeGroup.addEventListener('change', this.#eventTypeGroupHandler);
    this.#eventInputDestination.addEventListener('change', this.#eventInputDestinationHandler);
  }

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #eventTypeGroupHandler = (evt) => {
    evt.preventDefault();

    const newTypePoint = evt.target.value;

    this.updateElement({
      point: { ...this._state.point, ...{ type: newTypePoint } }
    });
  };

  #eventInputDestinationHandler = (evt) => {
    evt.preventDefault();

    const newCityDestinationPoint = evt.target.value;
    const newDestinationPoint = this.#mainDestinations.find((item) => item.name === newCityDestinationPoint);

    this.updateElement({
      currentDestination: { ...this._state.currentDestination, ...newDestinationPoint }
    });
  };
}
