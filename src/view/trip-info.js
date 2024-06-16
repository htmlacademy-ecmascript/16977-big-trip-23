import AbstractView from '../framework/view/abstract-view.js';
import DateBuilder from '../util/date-builder.js';
import SortBuilder from '../util/sort-builder.js';
import { MAX_VISIBLE_CITIES } from '../constants.js';

const createInfoTitleTemplate = (points, destinationsModel) => {
  const pointsByDaySort = new SortBuilder({ data: points }).getDaySort();
  const pointsDestination = pointsByDaySort.map((point) => destinationsModel.getDestinationByID(point));
  const cityCollection = pointsDestination.map((destination) => destination.name ? destination.name : null);

  let cities = '';

  if (cityCollection.length > MAX_VISIBLE_CITIES) {
    const firstCity = cityCollection[0];
    const lastCity = cityCollection[cityCollection.length - 1];

    cities = `${firstCity} &mdash; ... &mdash; ${lastCity}`;
  } else {
    cities = cityCollection.join(' &mdash; ');
  }

  return cities;
};

const createInfoDatesTemplate = (points) => {
  const minDate = new DateBuilder({ points }).getMinDate();
  const maxDate = new DateBuilder({ points }).getMaxDate();

  return `${minDate}&nbsp;&mdash;&nbsp;${maxDate}`;
};

const createInfoCostTemplate = (points, offersModel) => {
  const priceCollection = points.map((point) => point.basePrice);
  const priceSumCollection = priceCollection.reduce((a, b) => a + b, 0);

  const offersCollection = points.map((point) => offersModel.getOffersCurrentPoint(point));
  const offersSumCollection = offersCollection.map((offerCollection) => offerCollection.reduce((a, b) => a + b.price, 0));

  const offersSum = offersSumCollection.reduce((a, b) => a + b, 0);

  const sum = priceSumCollection + offersSum;

  return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>`;
};

const createTripInfoTemplate = ({ pointsModel, destinationsModel, offersModel }) => {
  const points = pointsModel.points;

  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">
          ${createInfoTitleTemplate(points, destinationsModel)}
        </h1>

        <p class="trip-info__dates">
        ${createInfoDatesTemplate(points)}
        </p>
      </div>

      <p class="trip-info__cost">
        ${createInfoCostTemplate(points, offersModel)}
      </p>
    </section>`);
};

export default class TripInfo extends AbstractView {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({ pointsModel, destinationsModel, offersModel }) {
    super();

    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get template() {
    return createTripInfoTemplate({
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
  }
}
