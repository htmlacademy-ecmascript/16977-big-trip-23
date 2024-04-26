import { createElement } from '../render.js';

const TRAVEL_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const TRAVEL_CITIES = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
];

const TRAVEL_OFFERS = [
  {
    key: 'luggage',
    title: 'Add luggage',
    price: '30',
    checked: true,
  },
  {
    key: 'comfort',
    title: 'Switch to comfort class',
    price: '100',
    checked: true,
  },
  {
    key: 'meal',
    title: 'Add meal',
    price: '15',
  },
  {
    key: 'seats',
    title: 'Choose seats',
    price: '5',
  },
  {
    key: 'train',
    title: 'Travel by train',
    price: '40',
  }
];

const createTravelTypeTemplate = (type) => `
  <div class="event__type-item">
    <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
  </div>`;

const createTravelCitiesTemplate = (city) => `<option value="${city}"></option>`;

const createTravelOffersTemplate = (data) => `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${data.key}-1" type="checkbox" name="event-offer-${data.key}" ${data.checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${data.key}-1">
      <span class="event__offer-title">${data.title}</span>
      +€&nbsp;
      <span class="event__offer-price">${data.price}</span>
    </label>
  </div>`;

const createFormEditPointTemplate = () => `
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            ${TRAVEL_TYPES.map((item) => createTravelTypeTemplate(item)).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          Flight
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
        <datalist id="destination-list-1">
          ${TRAVEL_CITIES.map((item) => createTravelCitiesTemplate(item)).join('')}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${TRAVEL_OFFERS.map((item) => createTravelOffersTemplate(item)).join('')}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
      </section>
    </section>
  </form>`;

export default class FormEditPoint {
  getTemplate() {
    return createFormEditPointTemplate();
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
