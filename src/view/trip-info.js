import AbstractView from '../framework/view/abstract-view.js';
import DateBuilder from '../util/date-builder.js';

const createInfoTitleTemplate = (points, destinationsModel) => {
  const pointsDestination = points.map((point) => destinationsModel.getDestinationByID(point));
  const cityCollection = pointsDestination.map((destination) => destination.name);

  let cities = '';

  if (cityCollection.length >= 3) {
    cities = `${cityCollection[0]} &mdash; ... &mdash; ${cityCollection[cityCollection.length - 1]}`;
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

const createInfoCostTemplate = (points) => {
  const priceCollection = points.map((point) => point.basePrice);
  const sum = priceCollection.reduce((a, b) => a + b, 0);

  return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${sum}</span>`;
};

const createTripInfoTemplate = ({ points, destinationsModel }) => `
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
      ${createInfoCostTemplate(points)}
    </p>
  </section>`;

export default class TripInfo extends AbstractView {
  #points = null;
  #destinationsModel = null;

  constructor({ points, destinationsModel }) {
    super();

    this.#points = points;
    this.#destinationsModel = destinationsModel;
  }

  get template() {
    return createTripInfoTemplate({ points: this.#points, destinationsModel: this.#destinationsModel });
  }
}
