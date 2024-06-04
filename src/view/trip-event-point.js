import AbstractView from '../framework/view/abstract-view.js';
import DateBuilder from '../util/date-builder.js';
import TripListItem from './trip-list-item.js';

const createEventOfferTemplate = (offer) => `
  <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`;

const createTripEventPointTemplate = ({ point, currentDestination, currentOffers }) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;
  const { name } = currentDestination;

  const startDate = new DateBuilder({ date: dateFrom }).getMonthAndDay();
  const fullStartDate = new DateBuilder({ date: dateFrom }).getFullDate();
  const fullStartDateAndTime = new DateBuilder({ date: dateFrom }).getFullDateAndTime();
  const startTime = new DateBuilder({ date: dateFrom }).getTime();

  const fullEndDateAndTime = new DateBuilder({ date: dateTo }).getFullDateAndTime();
  const endTime = new DateBuilder({ date: dateTo }).getTime();

  const differenceTime = new DateBuilder({ dateFrom: dateFrom, dateTo: dateTo }).getDifferenceTime();

  return `
  <div class="event">
    <time class="event__date" datetime="${fullStartDate}">${startDate}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type - ${type}">
    </div>
    <h3 class="event__title">${type} ${name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${fullStartDateAndTime}">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${fullEndDateAndTime}">${endTime}</time>
      </p>
      <p class="event__duration">${differenceTime}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${currentOffers.map((offer) => createEventOfferTemplate(offer)).join('')}
    </ul>
    <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z" />
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>`;
};

export default class TripEventPoint extends AbstractView {
  #point = [];
  #currentDestination = [];
  #currentOffers = [];

  #rollupButton = null;
  #favoriteButton = null;

  #handleRollupClick = null;
  #handleSwitchFavorite = null;

  constructor({ point, currentDestination, currentOffers, onRollupClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#currentDestination = currentDestination;
    this.#currentOffers = currentOffers;

    this.#handleRollupClick = onRollupClick;
    this.#handleSwitchFavorite = onFavoriteClick;

    this.#rollupButton = this.element.querySelector('.event__rollup-btn');
    this.#favoriteButton = this.element.querySelector('.event__favorite-btn');

    if (this.#rollupButton) {
      this.#rollupButton.addEventListener('click', this.#rollupClickHandler);
    }

    if (this.#favoriteButton) {
      this.#favoriteButton.addEventListener('click', this.#switchFavoriteHandler);
    }
  }

  get template() {
    const tripEventPointTemplate = createTripEventPointTemplate({ point: this.#point, currentDestination: this.#currentDestination, currentOffers: this.#currentOffers });

    return new TripListItem({ data: tripEventPointTemplate }).template;
  }


  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #switchFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleSwitchFavorite();
  };
}
