import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../constants.js';
import { updateItem } from '../util/common.js';
import FormEditPoint from '../view/form-point/form-edit-point.js';
import TripEventPoint from '../view/trip-event-point.js';

export default class PointPresenter {
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
    this.point = point;

    const prevTripEventPoint = this.#tripListPoint;
    const prevFormEditPoint = this.#tripFormEditPoint;

    const currentDestination = this.#destinationsModel.getDestinationByID(this.point);
    const currentOffers = this.#offersModel.getOffersCurrentPoint(this.point);

    this.#tripListPoint = new TripEventPoint({
      point: this.point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
      onRollupClick: () => this.#handleShowEditPoint(),
      onFavoriteClick: () => this.#handleSwitchFavorite(),
    });

    this.#tripFormEditPoint = new FormEditPoint({
      point: this.point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations,
      onRollupClick: () => this.#handleHideEditPoint(),
      onFormSubmit: () => this.#handleHideEditPoint(),
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

  #replacePointInsteadForm() {
    replace(this.#tripListPoint, this.#tripFormEditPoint);
  }

  #replaceFormInsteadPoint() {
    replace(this.#tripFormEditPoint, this.#tripListPoint);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
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
    this.#replacePointInsteadForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#mode = Mode.DEFAULT;
  };

  #handleSwitchFavorite = () => {
    const updatePoint = updateItem(this.point, { isFavorite: !this.point.isFavorite });

    this.#handleTripEventPointUpdate(updatePoint);
  };
}
