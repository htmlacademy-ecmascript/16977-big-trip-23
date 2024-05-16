import DateBuilder from './date-builder.js';

const createTravelTypeTemplate = ({ type, currentType }) => `
  <div class="event__type-item">
    <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
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

const createOffersSectionTemplate = ({ offersByTypeList, type, currentOffers }) => {
  if (!offersByTypeList.length) {
    return '';
  }

  return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersByTypeList.map((offer) => createTravelOffersTemplate({ type, offer, currentOffers })).join('')}
      </div>
    </section>`);
};

const createDestinationPhotoTemplate = (src, description) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createDestinationPhotosTemplate = (pictures) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${pictures.map((picture) => createDestinationPhotoTemplate(picture.src, picture.description)).join('')}
    </div>
  </div>`;

const createDestinationSectionTemplate = (destination) => {
  const { description, name, pictures } = destination;

  if (!description.length && !pictures.length) {
    return '';
  }

  return (`
    <section class="event__section  event__section--destination">
      ${description.length ? `
        <h3 class="event__section-title  event__section-title--destination">${name}</h3>
        <p class="event__destination-description">${description}</p>
        ` : ''}

      ${pictures.length ? createDestinationPhotosTemplate(pictures) : ''}
    </section>`);
};

const createFormPointTemplate = ({ point, currentDestination, currentOffers, mainOffers, mainDestinations }) => {
  const { basePrice, dateFrom, dateTo, type } = point;
  const { name } = currentDestination;

  const fullStartDateAndTime = new DateBuilder({ date: dateFrom }).getFullDateAndTimeCalendarFormat();
  const fullEndDateAndTime = new DateBuilder({ date: dateTo }).getFullDateAndTimeCalendarFormat();

  const offersByType = mainOffers.find((mainOffer) => mainOffer.type === point.type);

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

              ${mainOffers.map((offer) => createTravelTypeTemplate({ type: offer.type, currentType: point.type })).join('')}
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
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersSectionTemplate({ offersByTypeList: offersByType.offers, type, currentOffers })}

        ${createDestinationSectionTemplate(currentDestination)}
      </section>
    </form>`);
};

export default class FormBuilder {
  #point = [];
  #currentDestination = [];
  #currentOffers = [];
  #mainOffers = [];
  #mainDestinations = [];

  constructor({ point, currentDestination, currentOffers, mainOffers, mainDestinations }) {
    this.#point = point;
    this.#currentDestination = currentDestination;
    this.#currentOffers = currentOffers;
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;
  }

  getFormPointTemplate() {
    return createFormPointTemplate({
      point: this.#point,
      currentDestination: this.#currentDestination,
      currentOffers: this.#currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations
    });
  }
}
