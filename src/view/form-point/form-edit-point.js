import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { showMistakeStateField } from '../../util/common.js';
import FormBuilder from '../../util/form-builder.js';
import TripListItem from '../trip-list-item.js';

export default class FormEditPoint extends AbstractStatefulView {
  #mainOffers = [];
  #mainDestinations = [];

  #rollupButton = null;
  #formEventEdit = null;
  #formDeleteButton = null;
  #eventTypeGroup = null;
  #eventInputDestination = null;
  #eventInputPrice = null;
  #eventAvailableOffers = null;

  #handleRollupButtonClick = null;
  #handleFormSubmit = null;
  #handleDeleteButtonClick = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ point, currentDestination, currentOffers, mainOffers, mainDestinations, onRollupButtonClick, onFormSubmit, onDeleteButtonClick }) {
    super();
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;

    this._setState({
      point: {
        ...point,
        destination: currentDestination,
        offers: currentOffers
      }
    });

    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteButtonClick = onDeleteButtonClick;

    this._restoreHandlers();
  }

  get template() {
    const formEditPointComponent = new FormBuilder({
      settingsForm: {
        resetButtonName: 'Delete',
      },
      point: this._state.point,
      currentDestination: this._state.point.destination,
      currentOffers: this._state.point.offers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations
    }).getFormPointTemplate();

    return new TripListItem({ data: formEditPointComponent }).template;
  }

  reset({ point, currentDestination, currentOffers }) {
    this.updateElement(
      { point: { ...point, destination: currentDestination, offers: currentOffers } }
    );
  }

  _restoreHandlers() {
    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#formEventEdit = this.element.querySelector('.event--edit');
    this.#formDeleteButton = this.element.querySelector('.event__reset-btn');
    this.#eventTypeGroup = this.element.querySelector('.event__type-group');
    this.#eventInputDestination = this.element.querySelector('.event__input--destination');
    this.#eventInputPrice = this.element.querySelector('.event__input--price');

    this.#eventAvailableOffers = this.element.querySelector('.event__available-offers');

    this.#rollupButton.addEventListener('click', this.#rollupButtonClickHandler);
    this.#formEventEdit.addEventListener('submit', this.#formSubmitHandler);
    this.#formDeleteButton.addEventListener('click', this.#deleteButtonClickHandler);

    this.#eventTypeGroup.addEventListener('change', this.#eventTypeGroupChangeHandler);
    this.#eventInputDestination.addEventListener('change', this.#eventFieldDestinationChangeHandler);
    this.#eventInputPrice.addEventListener('change', this.#eventFieldPriceChangeHandler);

    if (this.element.querySelector('.event__offer-checkbox') !== null) {
      this.#eventAvailableOffers.addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  }

  #stateToPoint(state) {
    const point = {
      ...state.point,
      destination: state.point.destination.id,
      offers: this._state.point.offers.map((offer) => offer.id)
    };

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDelete;

    return point;
  }

  #getUpdatedState(update) {
    this._setState({
      point: {
        ...this._state.point,
        ...update,
        isDisabled: false,
        isSaving: false,
        isDelete: false
      }
    });

    return this._state;
  }

  #setDatepickerStart() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dateStartChangeHandler,
        maxDate: this._state.point.dateTo
      }
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.point.dateTo,
        onChange: this.#dateEndChangeHandler,
        minDate: this._state.point.dateFrom
      }
    );
  }

  #rollupButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleRollupButtonClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const currentStateDestinationName = this._state.point.destination.name;
    const currentStateDateFrom = this._state.point.dateFrom;
    const currentStateDateTo = this._state.point.dateTo;

    if (currentStateDestinationName.length === 0) {
      showMistakeStateField(this.#eventInputDestination);

      return;
    }

    if (currentStateDateFrom === null) {
      showMistakeStateField(this.element.querySelector('[name="event-start-time"]'));

      return;
    }

    if (currentStateDateTo === null) {
      showMistakeStateField(this.element.querySelector('[name="event-end-time"]'));

      return;
    }

    this.#handleFormSubmit(this.#stateToPoint(this._state));
  };

  #deleteButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleDeleteButtonClick(this.#stateToPoint(this._state));
  };

  #eventTypeGroupChangeHandler = (evt) => {
    evt.preventDefault();

    const newTypePoint = evt.target.value;

    this.updateElement(
      this.#getUpdatedState({ offers: [], type: newTypePoint })
    );
  };

  #eventFieldDestinationChangeHandler = (evt) => {
    evt.preventDefault();

    const newCityDestinationPoint = evt.target.value;
    const newDestinationPoint = this.#mainDestinations.find((item) => item.name === newCityDestinationPoint);

    if (newDestinationPoint === undefined) {
      showMistakeStateField(this.#eventInputDestination);

      return;
    }

    this.updateElement(
      this.#getUpdatedState({ destination: newDestinationPoint, offers: this._state.point.offers })
    );
  };

  #eventFieldPriceChangeHandler = (evt) => {
    evt.preventDefault();

    const price = evt.target.value;
    const isValidPrice = /^[1-9]\d*$/.test(price);

    if (isValidPrice) {
      this.#getUpdatedState({ basePrice: Number(price) });
    } else {
      this.updateElement(
        this.#getUpdatedState({ basePrice: 1 })
      );
    }
  };

  #offersChangeHandler = (evt) => {
    const target = evt.target;
    const hash = target.dataset.hash;

    if (target.checked) {
      const currentTypeOffers = this.#mainOffers.find((mainOffer) => mainOffer.type === this._state.point.type).offers;
      const newOfferIndex = currentTypeOffers.findIndex((offer) => offer.id === hash);

      this.#getUpdatedState(
        {
          offers: [
            ...this._state.point.offers.slice(0, newOfferIndex),
            currentTypeOffers[newOfferIndex],
            ...this._state.point.offers.slice(newOfferIndex),
          ]
        }
      );
    } else {
      const currentPointOffers = this._state.point.offers.filter((offer) => offer.id !== hash);

      this.#getUpdatedState(
        { offers: currentPointOffers }
      );
    }
  };

  #dateStartChangeHandler = ([date]) => {
    this.updateElement(
      this.#getUpdatedState({ dateFrom: date })
    );

    this.#datepickerEnd.set('minDate', date);
  };

  #dateEndChangeHandler = ([date]) => {
    this.updateElement(
      this.#getUpdatedState({ dateTo: date })
    );

    this.#datepickerStart.set('maxDate', date);
  };
}
