import { render, RenderPosition } from '../framework/render.js';
import { updateData } from '../util/common.js';

import TripInfo from '../view/trip-info.js';
import TripFilters from '../view/trip-filters.js';
import EventAddButton from '../view/event-add-button.js';
import TripSort from '../view/trip-sort.js';
import TripListContainer from '../view/trip-list-container.js';
import TripEmpty from '../view/trip-empty.js';
import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #pointsModel = [];
  #destinationsModel = [];
  #offersModel = [];
  #pointPresenters = new Map();
  #pageHeader = null;
  #tripMain = null;
  #tripFilters = null;
  #pageMain = null;
  #tripEvents = null;

  constructor({ pointsModel, destinationsModel, offersModel }) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pageHeader = document.querySelector('.page-header');
    this.#tripMain = this.#pageHeader.querySelector('.trip-main');
    this.#tripFilters = this.#pageHeader.querySelector('.trip-controls__filters');

    this.#pageMain = document.querySelector('.page-main');
    this.#tripEvents = this.#pageMain.querySelector('.trip-events');
  }

  init() {
    this.mainPoints = [...this.#pointsModel.points];
    this.mainOffers = [...this.#offersModel.offers];
    this.mainDestinations = [...this.#destinationsModel.destinations];

    this.#renderTripLayout();

    if (this.mainPoints.length) {
      this.#renderTripEventPoints({
        points: this.mainPoints,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        mainOffers: this.mainOffers,
        mainDestinations: this.mainDestinations
      });

      this.#renderTripSort();
    } else {
      this.#renderTripEmpty();
    }
  }

  #renderTripInfo() {
    render(new TripInfo(), this.#tripMain, RenderPosition.AFTERBEGIN);
  }

  #renderTripFilters() {
    render(new TripFilters({
      mainPoints: this.mainPoints,
    }), this.#tripFilters);
  }

  #renderEventAddButton() {
    render(new EventAddButton(), this.#tripMain);
  }

  #renderTripSort() {
    render(new TripSort(), this.#tripEvents);
  }

  #renderTripListContainer() {
    render(new TripListContainer(), this.#tripEvents);
  }

  #renderTripEventPoint({ point, destinationsModel, offersModel, mainOffers, mainDestinations, tripEventsList }) {
    const pointPresenter = new PointPresenter({
      destinationsModel,
      offersModel,
      mainOffers,
      mainDestinations,
      tripEventsList,
      onTripEventPointUpdate: this.#handleDataChange,
      onAllEditFormReset: this.#resetAllEditForms,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #clearTripEventPoints() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderTripEventPoints({ points, destinationsModel, offersModel, mainOffers, mainDestinations }) {
    this.tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    points.forEach((point) => {
      this.#renderTripEventPoint({
        point,
        destinationsModel,
        offersModel,
        mainOffers,
        mainDestinations,
        tripEventsList: this.tripEventsList,
      });
    });
  }

  #handleDataChange = (updateItem) => {
    this.mainPoints = updateData(this.mainPoints, updateItem);
    this.#pointPresenters.get(updateItem.id).init(updateItem);
  };

  #resetAllEditForms = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
  };

  #renderTripEmpty() {
    render(new TripEmpty(), this.#tripEvents);
  }

  #renderTripLayout() {
    this.#renderTripInfo();
    this.#renderTripFilters();
    this.#renderEventAddButton();

    this.#renderTripListContainer();
  }
}
