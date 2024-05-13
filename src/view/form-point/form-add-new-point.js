import AbstractView from '../../framework/view/abstract-view.js';
import FormBuilder from '../../util/form-builder.js';

const DEFAULT_TRAVEL = {
  'basePrice': '',
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': {
    'id': '',
    'description': '',
    'name': '',
    'pictures': []
  },
  'isFavorite': false,
  'offers': [],
  'type': 'taxi'
};

export default class FormAddNewPoint extends AbstractView {
  #point = [];
  #currentDestination = [];
  #currentOffers = [];
  #mainOffers = [];
  #mainDestinations = [];

  constructor({ mainOffers, mainDestinations }) {
    super();
    this.#point = DEFAULT_TRAVEL;
    this.#currentDestination = DEFAULT_TRAVEL.destination;
    this.#currentOffers = DEFAULT_TRAVEL.offers;
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
