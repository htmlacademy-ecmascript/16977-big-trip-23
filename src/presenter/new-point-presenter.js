import { render, RenderPosition, remove } from '../framework/render.js';
import { FiltersType, UpdateType, UserAction } from '../constants.js';
import EventAddButton from '../view/event-add-button.js';
import FormAddNewPoint from '../view/form-point/form-add-new-point.js';

export default class NewPointPresenter {
  #offersModel = [];
  #destinationsModel = null;
  #filtersModel = null;
  #handleTripEventPointUpdate = null;

  #pageHeaderElement = null;
  #tripMainElement = null;

  #eventAddButtonComponent = null;
  #formAddNewPointComponent = null;

  constructor({ offersModel, destinationsModel, filtersModel, onTripEventPointUpdate }) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;
    this.#handleTripEventPointUpdate = onTripEventPointUpdate;

    this.#pageHeaderElement = document.querySelector('.page-header');
    this.#tripMainElement = this.#pageHeaderElement.querySelector('.trip-main');

    this.#eventAddButtonComponent = new EventAddButton({
      onClickAddNewPointButton: this.#handleAddNewPointButtonClick
    });
  }

  init() {
    render(this.#eventAddButtonComponent, this.#tripMainElement);
  }

  destroy() {
    if (this.#formAddNewPointComponent === null) {
      return;
    }

    remove(this.#formAddNewPointComponent);

    this.#eventAddButtonComponent.element.removeAttribute('disabled');
  }

  disabledButton() {
    this.#eventAddButtonComponent.element.setAttribute('disabled', true);
  }

  enabledButton() {
    this.#eventAddButtonComponent.element.removeAttribute('disabled');
  }

  setSaving() {
    this.#formAddNewPointComponent.updateElement({
      point: {
        ...this.#formAddNewPointComponent._state.point,
        isDisabled: true,
        isSaving: true,
      }
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#formAddNewPointComponent.updateElement({
        point: {
          ...this.#formAddNewPointComponent._state.point,
          isSaving: false,
          isDisabled: false,
        }
      });
    };

    this.#formAddNewPointComponent.shake(resetFormState);
  }

  #initFormAddNewPoint() {
    this.#formAddNewPointComponent = new FormAddNewPoint({
      mainOffers: this.#offersModel.offers,
      mainDestinations: this.#destinationsModel.destinations,
      onRollupButtonClick: () => this.#handleEditPointHide(),
      onFormSubmit: this.#handleFormEditPointSubmit,
      onCancelButtonClick: this.#handleCancelButtonClick,
    });
  }

  #handleAddNewPointButtonClick = () => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: true });

    this.disabledButton();

    const tripEventListElement = document.querySelector('.trip-events__list');

    this.#initFormAddNewPoint();

    render(this.#formAddNewPointComponent, tripEventListElement, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      this.destroy();

      this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: false });

      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleEditPointHide = () => {
    this.destroy();

    this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: false });

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormEditPointSubmit = (update) => {
    this.#handleTripEventPointUpdate(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      update,
    );
  };

  #handleCancelButtonClick = () => {
    this.destroy();

    this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: false });
  };
}
