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

  #tripListPointComponent = null;
  #tripFormEditPointComponent = null;

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

    const prevTripEventPoint = this.#tripListPointComponent;
    const prevFormEditPoint = this.#tripFormEditPointComponent;

    const currentDestination = this.#destinationsModel.getDestinationByID(this.#point);
    const currentOffers = this.#offersModel.getOffersCurrentPoint(this.#point);

    this.#tripListPointComponent = new TripEventPoint({
      point: this.#point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
      onRollupButtonClick: () => this.#handleEditPointShow(),
      onFavoriteButtonClick: () => this.#handleFavoriteButtonClick(),
    });

    this.#initTripFormEditPointComponent();

    if (prevTripEventPoint === null || prevFormEditPoint === null) {
      render(this.#tripListPointComponent, this.#tripEventsList);
      return;
    }

    if (this.#tripEventsList.contains(prevTripEventPoint.element)) {
      replace(this.#tripListPointComponent, prevTripEventPoint);
    }

    if (this.#tripEventsList.contains(prevFormEditPoint.element)) {
      replace(this.#tripFormEditPointComponent, prevFormEditPoint);
    }
  }

  reset() {
    if (this.#mode === Mode.EDIT) {
      this.#handleEditPointHide();
    }
  }

  destroy() {
    remove(this.#tripListPointComponent);
    remove(this.#tripFormEditPointComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDIT) {
      this.#tripFormEditPointComponent.updateElement({
        point: {
          ...this.#tripFormEditPointComponent._state.point,
          isDisabled: true,
          isSaving: true,
        }
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDIT) {
      this.#tripFormEditPointComponent.updateElement({
        point: {
          ...this.#tripFormEditPointComponent._state.point,
          isDisabled: true,
          isDelete: true
        }
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripListPointComponent.shake();

      return;
    }

    const resetFormState = () => {
      this.#tripFormEditPointComponent.updateElement({
        point: {
          ...this.#tripFormEditPointComponent._state.point,
          isSaving: false,
          isDisabled: false,
          isDelete: false
        }
      });
    };

    this.#tripFormEditPointComponent.shake(resetFormState);
  }

  #initTripFormEditPointComponent() {
    const currentDestination = this.#destinationsModel.getDestinationByID(this.#point);
    const currentOffers = this.#offersModel.getOffersCurrentPoint(this.#point);

    this.#tripFormEditPointComponent = new FormEditPoint({
      mode: this.#mode,
      point: this.#point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
      mainOffers: this.#mainOffers,
      mainDestinations: this.#mainDestinations,
      onRollupButtonClick: () => this.#handleEditPointHide(),
      onFormSubmit: this.#handleFormEditPointSubmit,
      onDeleteButtonClick: this.#handleDeleteButtonClick,
    });
  }

  #resetFormEditPoint() {
    const currentDestination = this.#destinationsModel.getDestinationByID(this.#point);
    const currentOffers = this.#offersModel.getOffersCurrentPoint(this.#point);

    this.#tripFormEditPointComponent.reset({
      point: this.#point,
      currentDestination: currentDestination,
      currentOffers: currentOffers,
    });
  }

  #replacePointInsteadForm() {
    replace(this.#tripListPointComponent, this.#tripFormEditPointComponent);

    this.#tripFormEditPointComponent.removeElement();
  }

  #replaceFormInsteadPoint() {
    replace(this.#tripFormEditPointComponent, this.#tripListPointComponent);
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

  #handleEditPointShow = () => {
    this.#handleAllEditFormReset();

    this.#mode = Mode.EDIT;

    this.#initTripFormEditPointComponent();

    this.#replaceFormInsteadPoint();

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditPointHide = () => {
    this.#resetFormEditPoint();

    this.#replacePointInsteadForm();

    document.removeEventListener('keydown', this.#escKeyDownHandler);


    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteButtonClick = () => {
    this.#handleTripEventPointUpdate(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      { ...this.#point, ...{ isFavorite: !this.#point.isFavorite } }
    );
  };

  #handleFormEditPointSubmit = (update) => {
    const isDateEqual = DateBuilder.isDateEqual(this.#point.dateFrom, update.dateFrom) && DateBuilder.isDateEqual(this.#point.dateTo, update.dateTo);
    const isOldPrice = this.#point.basePrice === update.basePrice;
    const isPatchUpdate = isDateEqual && isOldPrice;

    this.#handleTripEventPointUpdate(
      UserAction.UPDATE_POINT,
      isPatchUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update,
    );
  };

  #handleDeleteButtonClick = (point) => {
    this.#handleTripEventPointUpdate(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
