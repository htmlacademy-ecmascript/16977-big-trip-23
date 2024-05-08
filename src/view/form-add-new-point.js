import { createElement } from '../render.js';
import DateBuilder from '../util/date-builder.js';

const DEFAULT_TRAVEL = {
  'basePrice': '',
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'taxi'
};

const createTravelTypeTemplate = (type) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
  </div>`;

const createTravelCitiesTemplate = (city) => `<option value="${city}"></option>`;

const createTravelOffersTemplate = ({ type, offer, currentOffers }) => {
  const { id, title, price } = offer;

  const isCheckedOffer = currentOffers.find((currentOffer) => id === currentOffer.id);

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isCheckedOffer ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${title}</span>
        +€&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`);
};

const createFormAddNewPointTemplate = ({ mainOffers, mainDestinations }) => {
  const { basePrice, dateFrom, dateTo, type, offers } = DEFAULT_TRAVEL;
  const offersByType = mainOffers.find((mainOffer) => mainOffer.type === DEFAULT_TRAVEL.type);

  const fullStartDateAndTime = new DateBuilder({ date: dateFrom }).getFullDateAndTimeCalendarFormat();
  const fullEndDateAndTime = new DateBuilder({ date: dateTo }).getFullDateAndTimeCalendarFormat();

  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type - ${type}">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${mainOffers.map((offer) => createTravelTypeTemplate(offer.type)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${mainDestinations.map((destination) => createTravelCitiesTemplate(destination.name)).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${fullStartDateAndTime}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${fullEndDateAndTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersByType.offers.map((offer) => createTravelOffersTemplate({ type, offer, currentOffers: offers })).join('')}
          </div>
        </section>
      </section>
    </form>`);
};

export default class FormAddNewPoint {
  constructor({ mainOffers, mainDestinations }) {
    this.mainOffers = mainOffers;
    this.mainDestinations = mainDestinations;
  }

  getTemplate() {
    return createFormAddNewPointTemplate({
      mainOffers: this.mainOffers,
      mainDestinations: this.mainDestinations
    }
    );
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
