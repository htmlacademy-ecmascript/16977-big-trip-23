import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { showMistakeStateField } from '../../util/common.js';
import { DateFormat } from '../../constants.js';
import FormBuilder from '../../util/form-builder.js';
import TripListItem from '../trip-list-item.js';

const DEFAULT_TRAVEL = {
  'basePrice': '0',
  'dateFrom': null,
  'dateTo': null,
  'destination': {
    'id': '',
    'description': '',
    'name': '',
    'pictures': []
  },
  'isFavorite': false,
  'offers': [],
  'type': 'flight'
};

export default class FormAddNewPoint extends AbstractStatefulView {
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
  #handleCancelButtonClick = null;

  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ mainOffers, mainDestinations, onRollupButtonClick, onFormSubmit, onCancelButtonClick }) {
    super();
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;

    this._setState({
      point: {
        ...DEFAULT_TRAVEL,
        destination: DEFAULT_TRAVEL.destination,
        offers: DEFAULT_TRAVEL.offers
      }
    });

    this.#handleRollupButtonClick = onRollupButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelButtonClick = onCancelButtonClick;

    this._restoreHandlers();
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
    this.#formDeleteButton.addEventListener('click', this.#cancelButtonClickHandler);

    this.#eventTypeGroup.addEventListener('change', this.#eventTypeGroupChangeHandler);
    this.#eventInputDestination.addEventListener('change', this.#eventFieldDestinationChangeHandler);
    this.#eventInputPrice.addEventListener('change', this.#eventFieldPriceChangeHandler);

    if (this.element.querySelector('.event__offer-checkbox') !== null) {
      this.#eventAvailableOffers.addEventListener('change', this.#offersChangeHandler);
    }

    this.#setDatepicker();
  }

  get template() {
    const formAddNewPointComponent = new FormBuilder({
      settingsForm: {
        resetButtonName: 'Cancel',
      },
      point: this._state.point,
      currentDestination: this._state.point.destination,
      currentOffers: this._state.point.offers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations
    }).getFormPointTemplate();

    return new TripListItem({ data: formAddNewPointComponent }).template;
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  #stateToPoint(state) {
    const point = {
      ...state.point,
      destination: state.point.destination.id,
      offers: this._state.point.offers.map((offer) => offer.id)
    };

    delete point.isDisabled;
    delete point.isSaving;

    return point;
  }

  #getUpdatedState(update) {
    this._setState({
      point: {
        ...this._state.point,
        ...update,
        isDisabled: false,
        isSaving: false,
      }
    });

    return this._state;
  }

  #setDatepicker() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: DateFormat.DATE_PICKER,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dateStartChangeHandler,
        maxDate: this._state.point.dateTo
      }
    );

    this.#datepickerEnd = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: DateFormat.DATE_PICKER,
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

  #cancelButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleCancelButtonClick(this.#stateToPoint(this._state));
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
    this.#getUpdatedState({ dateFrom: date });

    this.#datepickerEnd.set('minDate', date);
  };

  #dateEndChangeHandler = ([date]) => {
    this.#getUpdatedState({ dateTo: date });

    this.#datepickerStart.set('maxDate', date);
  };
}
