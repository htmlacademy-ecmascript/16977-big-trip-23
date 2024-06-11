import { render, replace, remove } from '../framework/render.js';
import { Mode, UpdateType, UserAction } from '../constants.js';
import DateBuilder from '../util/date-builder.js';
import FormEditPoint from '../view/form-point/form-edit-point.js';
import TripEventPoint from '../view/trip-event-point.js';

export default class PointPresenter {
  #point = null;
  #tripEventsList = null;

  #destinationsModel = null;
  #offersModel = null;
  #mainOffers = null;
  #mainDestinations = null;
  #mode = Mode.DEFAULT;

  #tripListPoint = null;
  #tripFormEditPoint = null;

  #handleTripEventPointUpdate = null;
  #handleAllEditFormReset = null;

  constructor({ destinationsModel, offersModel, mainOffers, mainDestinations, tripEventsList, onTripEventPointUpdate, onAllEditFormReset }) {
    this.#tripEventsList = tripEventsList;

    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#mainOffers = mainOffers;
    this.#mainDestinations = mainDestinations;

    this.#handleTripEventPointUpdate = onTripEventPointUpdate;
    this.#handleAllEditFormReset = onAllEditFormReset;
  }

  init(point) {
    this.#point = point;

    const prevTripEventPoint = this.#tripListPoint;
    const prevFormEditPoint = this.#tripFormEditPoint;

    const currentDestination = this.#destinationsModel.getDestinationByID(this.#point);
    const currentOffers = this.#offersModel.getOffersCurrentPoint(this.#point);

    this.#tripListPoint = new TripEventPoint({
      point: this.#point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
      onRollupClick: () => this.#handleShowEditPoint(),
      onFavoriteClick: () => this.#handleSwitchFavorite(),
    });

    this.#tripFormEditPoint = new FormEditPoint({
      point: this.#point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations,
      onRollupClick: () => this.#handleHideEditPoint(),
      onFormSubmit: this.#handleSubmitFormEditPoint,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevTripEventPoint === null || prevFormEditPoint === null) {
      render(this.#tripListPoint, this.#tripEventsList);
      return;
    }

    if (this.#tripEventsList.contains(prevTripEventPoint.element)) {
      replace(this.#tripListPoint, prevTripEventPoint);
    }

    if (this.#tripEventsList.contains(prevFormEditPoint.element)) {
      replace(this.#tripFormEditPoint, prevFormEditPoint);
    }
  }

  reset() {
    if (this.#mode === Mode.EDIT) {
      this.#handleHideEditPoint();
    }
  }

  destroy() {
    remove(this.#tripListPoint);
    remove(this.#tripFormEditPoint);
  }

  #resetFormEditPoint() {
    const currentDestination = this.#destinationsModel.getDestinationByID(this.#point);
    const currentOffers = this.#offersModel.getOffersCurrentPoint(this.#point);

    this.#tripFormEditPoint.reset({
      point: this.#point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
    });
  }

  #replacePointInsteadForm() {
    replace(this.#tripListPoint, this.#tripFormEditPoint);
  }

  #replaceFormInsteadPoint() {
    replace(this.#tripFormEditPoint, this.#tripListPoint);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      this.#resetFormEditPoint();

      this.#replacePointInsteadForm();
      document.removeEventListener('keydown', this.#escKeyDownHandler);

      this.#mode = Mode.DEFAULT;
    }
  };

  #handleShowEditPoint = () => {
    this.#handleAllEditFormReset();
    this.#replaceFormInsteadPoint();
    document.addEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.EDIT;
  };

  #handleHideEditPoint = () => {
    this.#resetFormEditPoint();

    this.#replacePointInsteadForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
  };

  #handleSwitchFavorite = () => {
    this.#handleTripEventPointUpdate(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, ...{ isFavorite: !this.#point.isFavorite } }
    );
  };

  #handleSubmitFormEditPoint = (update) => {
    const isDateEqual = DateBuilder.isDateEqual(this.#point.dateFrom, update.dateFrom) && DateBuilder.isDateEqual(this.#point.dateTo, update.dateTo);
    const isOldPrice = this.#point.basePrice === update.basePrice;
    const isPatchUpdate = isDateEqual && isOldPrice;

    this.#handleTripEventPointUpdate(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update,
    );
    this.#replacePointInsteadForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
  };

  #handleDeleteClick = (point) => {
    this.#handleTripEventPointUpdate(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
