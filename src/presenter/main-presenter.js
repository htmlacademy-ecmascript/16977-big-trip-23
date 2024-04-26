import { render, RenderPosition } from '../render.js';
import TripInfo from '../view/trip-info.js';
import TripFilters from '../view/trip-filters.js';
import EventAddBtn from '../view/event-add-btn.js';
import TripSort from '../view/trip-sort.js';
import TripListContainer from '../view/trip-list-container.js';
import TripListItem from '../view/trip-list-item.js';
import FormEditPoint from '../view/form-edit-point.js';
import TripEventPoint from '../view/trip-event-point.js';

const EVENT_POINT_COUNT = 3;

export default class MainPresenter {
  constructor() {
    this.pageHeader = document.querySelector('.page-header');
    this.tripMain = this.pageHeader.querySelector('.trip-main');
    this.tripFilters = this.pageHeader.querySelector('.trip-controls__filters');

    this.pageMain = document.querySelector('.page-main');
    this.tripEvents = this.pageMain.querySelector('.trip-events');
  }

  renderTripInfo() {
    render(new TripInfo(), this.tripMain, RenderPosition.AFTERBEGIN);
  }

  renderTripFilters() {
    render(new TripFilters(), this.tripFilters, RenderPosition.BEFOREEND);
  }

  renderEventAddBtn() {
    render(new EventAddBtn(), this.tripMain, RenderPosition.BEFOREEND);
  }

  renderTripSort() {
    render(new TripSort(), this.tripEvents, RenderPosition.BEFOREEND);
  }

  renderTripListContainer() {
    render(new TripListContainer(), this.tripEvents, RenderPosition.BEFOREEND);
  }

  renderFormEditPoint() {
    this.tripEventsList = this.tripEvents.querySelector('.trip-events__list');

    const formEditPoint = new FormEditPoint();

    render(new TripListItem(formEditPoint.getTemplate()), this.tripEventsList, RenderPosition.BEFOREEND);
  }

  renderTripEventPoint() {
    this.tripEventsList = this.tripEvents.querySelector('.trip-events__list');

    const tripEventPoint = new TripEventPoint();

    for (let i = 0; i < EVENT_POINT_COUNT; i++) {
      render(new TripListItem(tripEventPoint.getTemplate()), this.tripEventsList, RenderPosition.BEFOREEND);
    }
  }

  init() {
    this.renderTripInfo();
    this.renderTripFilters();
    this.renderEventAddBtn();
    this.renderTripSort();
    this.renderTripListContainer();
    this.renderFormEditPoint();
    this.renderTripEventPoint();
  }
}
