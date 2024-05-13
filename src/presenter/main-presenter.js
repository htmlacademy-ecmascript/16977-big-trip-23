import { render, RenderPosition, replace } from '../framework/render.js';

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
  #pointsModel = [];
  #destinationsModel = [];
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

  #renderTripInfo() {
    render(new TripInfo(), this.#tripMain, RenderPosition.AFTERBEGIN);
  }

  #renderTripFilters() {
    render(new TripFilters(), this.#tripFilters);
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

  #renderAddNewPoint({ mainOffers, mainDestinations }) {
    this.tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    const formAddNewPoint = new FormAddNewPoint({ mainOffers, mainDestinations });

    render(new TripListItem(formAddNewPoint.template), this.tripEventsList);
  }

  #renderTripEventPoint({ points, destinationsModel, offersModel, mainOffers, mainDestinations }) {
    this.tripEventsList = this.#tripEvents.querySelector('.trip-events__list');

    points.forEach((point) => {
      const currentDestination = destinationsModel.getDestinationByID(point);
      const currentOffers = offersModel.getOffersCurrentPoint(point);

      const escKeyDownHandler = (evt) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          replacePointInsteadForm();
          document.removeEventListener('keydown', escKeyDownHandler);
        }
      };

      const tripEventPoint = new TripEventPoint({
        point,
        currentDestination,
        currentOffers
      });

      const formEditPoint = new FormEditPoint({
        point,
        currentDestination,
        currentOffers,
        mainOffers,
        mainDestinations,
      });

      const tripListPoint = new TripListItem({
        data: tripEventPoint.template,
        onRollupClick: () => {
          replaceFormInsteadPoint();
          document.addEventListener('keydown', escKeyDownHandler);
        }
      });

      const tripListForm = new TripListItem({
        data: formEditPoint.template,
        onRollupClick: () => {
          replacePointInsteadForm();
          document.removeEventListener('keydown', escKeyDownHandler);
        },
        onFormSubmit: () => {
          replacePointInsteadForm();
          document.removeEventListener('keydown', escKeyDownHandler);
        }
      });

      function replacePointInsteadForm() {
        replace(tripListPoint, tripListForm);
      }

      function replaceFormInsteadPoint() {
        replace(tripListForm, tripListPoint);
      }

      render(tripListPoint, this.tripEventsList);
    });
  }

  #renderTripLayout() {
    this.#renderTripInfo();
    this.#renderTripFilters();
    this.#renderEventAddButton();

    this.#renderTripSort();
    this.#renderTripListContainer();
  }

  // Блок на будущее, в задании пока нет рекомендаций его поазывать
  // this.#renderAddNewPoint({
  //   mainOffers: this.mainOffers,
  //   mainDestinations: this.mainDestinations
  // });

  init() {
    this.mainPoints = [...this.#pointsModel.points];
    this.mainOffers = [...this.#offersModel.offers];
    this.mainDestinations = [...this.#destinationsModel.destinations];

    this.#renderTripLayout();

    this.#renderTripEventPoint({
      points: this.mainPoints,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      mainOffers: this.mainOffers,
      mainDestinations: this.mainDestinations
    });

  }
}
