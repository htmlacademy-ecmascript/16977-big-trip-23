import { createElement } from '../../render.js';
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

export default class FormAddNewPoint {
  constructor({ mainOffers, mainDestinations }) {
    this.point = DEFAULT_TRAVEL;
    this.currentDestination = DEFAULT_TRAVEL.destination;
    this.currentOffers = DEFAULT_TRAVEL.offers;
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
