import { render, RenderPosition } from '../framework/render.js';

import TripInfo from '../view/trip-info.js';
import TripFilters from '../view/trip-filters.js';
import EventAddButton from '../view/event-add-button.js';
import TripSort from '../view/trip-sort.js';
import TripListContainer from '../view/trip-list-container.js';
import TripListItem from '../view/trip-list-item.js';
import FormEditPoint from '../view/form-point/form-edit-point.js';
import FormAddNewPoint from '../view/form-point/form-add-new-point.js';
import TripEventPoint from '../view/trip-event-point.js';

export default class MainPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = [];
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

  renderTripInfo() {
    render(new TripInfo(), this.#tripMain, RenderPosition.AFTERBEGIN);
  }

  renderTripFilters() {
    render(new TripFilters(), this.#tripFilters, RenderPosition.BEFOREEND);
  }

  renderEventAddButton() {
    render(new EventAddButton(), this.#tripMain, RenderPosition.BEFOREEND);
  }

  renderTripSort() {
    render(new TripSort(), this.#tripEvents, RenderPosition.BEFOREEND);
  }

  renderTripListContainer() {
    render(new TripListContainer(), this.#tripEvents, RenderPosition.BEFOREEND);
  }

  renderFormEditPoint({ point, destinationsModel, offersModel, mainOffers, mainDestinations }) {
    this.tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    const currentDestination = destinationsModel.getDestinationByID(point);
    const currentOffers = offersModel.getOffersCurrentPoint(point);

    const formEditPoint = new FormEditPoint({ point, currentDestination, currentOffers, mainOffers, mainDestinations });

    render(new TripListItem(formEditPoint.template), this.tripEventsList, RenderPosition.BEFOREEND);
  }

  renderAddNewPoint({ mainOffers, mainDestinations }) {
    this.tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    const formAddNewPoint = new FormAddNewPoint({ mainOffers, mainDestinations });

    render(new TripListItem(formAddNewPoint.template), this.tripEventsList, RenderPosition.BEFOREEND);
  }

  renderTripEventPoint({ points, destinationsModel, offersModel }) {
    this.tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    points.forEach((point) => {
      const currentDestination = destinationsModel.getDestinationByID(point);
      const currentOffers = offersModel.getOffersCurrentPoint(point);

      const tripEventPoint = new TripEventPoint({ point, currentDestination, currentOffers });
      const tripListItem = new TripListItem(tripEventPoint.template);

      render(tripListItem, this.tripEventsList, RenderPosition.BEFOREEND);
    });
  }

  init() {
    this.mainPoints = [...this.#pointsModel.points];
    this.mainOffers = [...this.#offersModel.offers];
    this.mainDestinations = [...this.#destinationsModel.destinations];

    this.renderTripInfo();
    this.renderTripFilters();
    this.renderEventAddButton();

    this.renderTripSort();
    this.renderTripListContainer();

    // this.renderFormEditPoint({
    //   point: this.mainPoints[getRandomInt(0, this.mainPoints.length)],
    //   destinationsModel: this.#destinationsModel,
    //   offersModel: this.#offersModel,
    //   mainOffers: this.mainOffers,
    //   mainDestinations: this.mainDestinations
    // });

    // Блок на будущее, в задании пока нет рекомендаций его поазывать
    // this.renderAddNewPoint({
    //   mainOffers: this.mainOffers,
    //   mainDestinations: this.mainDestinations
    // });

    this.renderTripEventPoint({
      points: this.mainPoints,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
  }
}
