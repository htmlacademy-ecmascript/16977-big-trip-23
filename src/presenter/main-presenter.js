import { remove, render } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import { SortBuilder } from '../util/sort-builder.js';
import { FiltersBuilder } from '../util/filters-builder.js';

import { TravelSortItem, UserAction, UpdateType, FilterMessage, EventMessage, TimeLimitUiBlockAnimation } from '../constants.js';

import TripEventTripEventMessage from '../view/trip-event-message.js';
import TripSort from '../view/trip-sort.js';
import TripListContainer from '../view/trip-list-container.js';
import TripEmpty from '../view/trip-empty.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

export default class MainPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filtersModel = null;

  #newPointPresenter = null;

  #tripEventMessageComponent = null;
  #tripInfoComponent = null;
  #tripFiltersElementComponent = null;
  #tripEventButtonComponent = null;
  #tripListContainerComponent = null;
  #tripSortComponent = null;
  #tripEmptyComponent = null;

  #currentSortType = TravelSortItem.DAY.fieldName;

  #pointPresenters = new Map();

  #pageMainElement = null;
  #tripEventsElement = null;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimitL: TimeLimitUiBlockAnimation.LOWER,
    upperLimitL: TimeLimitUiBlockAnimation.UPPER
  });

  constructor({ pointsModel, destinationsModel, offersModel, filtersModel }) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;

    this.#pageMainElement = document.querySelector('.page-main');
    this.#tripEventsElement = this.#pageMainElement.querySelector('.trip-events');

    this.#newPointPresenter = new NewPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      filtersModel: this.#filtersModel,
      onTripEventPointUpdate: this.#handleViewAction
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const currentFilter = this.#filtersModel.filter;
    const currentPoints = new FiltersBuilder({ data: this.#pointsModel.points }).getFilteredPoints(currentFilter);

    switch (this.#currentSortType) {
      case TravelSortItem.DAY.fieldName:
        return new SortBuilder({ data: currentPoints }).getDaySort();
      case TravelSortItem.PRICE.fieldName:
        return new SortBuilder({ data: currentPoints }).getSortByPrice();
      case TravelSortItem.TIME.fieldName:
        return new SortBuilder({ data: currentPoints }).getSortByTime();
    }

    return currentPoints || [];
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#newPointPresenter.init();
    this.#newPointPresenter.disabledButton();

    this.#renderBoard();
  }

  #renderTripSort() {
    this.#tripSortComponent = new TripSort({
      currentSortType: this.#currentSortType,
      onTripSortChange: this.#handleTripSortChange
    });

    render(this.#tripSortComponent, this.#tripEventsElement);
  }

  #renderTripListContainer() {
    this.#tripListContainerComponent = new TripListContainer();

    render(this.#tripListContainerComponent, this.#tripEventsElement);
  }

  #renderTripEventPoint({ point, destinationsModel, offersModel, mainOffers, mainDestinations, tripEventsList }) {
    const pointPresenter = new PointPresenter({
      destinationsModel,
      offersModel,
      mainOffers,
      mainDestinations,
      tripEventsList,
      onTripEventPointUpdate: this.#handleViewAction,
      onAllEditFormReset: this.#resetAllEditForms,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderTripEventPoints({ points, destinationsModel, offersModel, mainOffers, mainDestinations }) {
    this.tripEventsList = this.#tripEventsElement.querySelector('.trip-events__list');

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

  #renderTripEmpty() {
    const currentFilterTitle = FilterMessage[this.#filtersModel.filter];

    this.#tripEmptyComponent = new TripEmpty({ message: currentFilterTitle });

    render(this.#tripEmptyComponent, this.#tripEventsElement);
  }

  #renderLoading() {
    this.#tripEventMessageComponent = new TripEventTripEventMessage({ message: EventMessage.LOADING });

    render(this.#tripEventMessageComponent, this.#tripEventsElement);
  }

  #renderFailedLoadData() {
    this.#tripEventMessageComponent = new TripEventTripEventMessage({ message: EventMessage.FAILED_LOAD_DATA });

    render(this.#tripEventMessageComponent, this.#tripEventsElement);
  }

  #resetAllEditForms = () => {
    this.#pointPresenters.forEach((presenter) => presenter.reset());
    this.#newPointPresenter.destroy();
  };

  #clearBoard({ resetSortType = false } = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter.destroy();

    remove(this.#tripInfoComponent);
    remove(this.#tripFiltersElementComponent);
    remove(this.#tripEventButtonComponent);

    remove(this.#tripSortComponent);
    remove(this.#tripListContainerComponent);
    remove(this.#tripEmptyComponent);

    if (resetSortType) {
      this.#currentSortType = TravelSortItem.DAY.fieldName;
    }
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length) {
      remove(this.#tripEventMessageComponent);

      this.#newPointPresenter.enabledButton();

      this.#renderTripSort();

      this.#renderTripListContainer();

      this.#renderTripEventPoints({
        points: this.points,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        mainOffers: this.offers,
        mainDestinations: this.destinations
      });
    } else {
      this.#renderTripEmpty();
    }
  }

  #handleTripSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();

        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();

        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();

        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch {
          this.#pointPresenters.get(update.id).setAborting();
        }
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#tripEventMessageComponent);

        if (data.isError) {
          this.#renderFailedLoadData();
          return;
        }

        this.#renderBoard();
        break;
    }
  };
}
