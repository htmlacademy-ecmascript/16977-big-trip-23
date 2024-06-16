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
      onClickAddNewPointButton: this.#handleClickAddNewPointButton
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

    this.#initAddNewPointComponent();
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
          isDelete: false
        }
      });
    };

    this.#formAddNewPointComponent.shake(resetFormState);
  }

  #initAddNewPointComponent() {
    this.#formAddNewPointComponent = new FormAddNewPoint({
      mainOffers: this.#offersModel.offers,
      mainDestinations: this.#destinationsModel.destinations,
      onRollupClick: () => this.#handleHideEditPoint(),
      onFormSubmit: this.#handleSubmitFormEditPoint,
      onCancelClick: this.#handleCancelClick,
    });
  }

  #handleClickAddNewPointButton = () => {
    this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: true });

    this.disabledButton();

    const tripEventListElement = document.querySelector('.trip-events__list');

    this.#initAddNewPointComponent();

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

  #handleHideEditPoint = () => {
    this.destroy();

    this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: false });

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleSubmitFormEditPoint = (update) => {
    this.#handleTripEventPointUpdate(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      update,
    );
  };

  #handleCancelClick = () => {
    this.destroy();

    this.#filtersModel.setFilter(UpdateType.MAJOR, { filter: FiltersType.EVERYTHING, isHidden: false });
  };
}
