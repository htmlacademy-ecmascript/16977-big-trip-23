import { render, RenderPosition, remove } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class TripInfoPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripInfoComponent = null;

  #pageHeaderElement = null;
  #tripMainElement = null;

  constructor({ pointsModel, destinationsModel, offersModel }) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#tripInfoComponent = new TripInfo({
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });

    this.#pageHeaderElement = document.querySelector('.page-header');
    this.#tripMainElement = this.#pageHeaderElement.querySelector('.trip-main');
  }

  init() {
    render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this.#tripInfoComponent === null) {
      return;
    }

    remove(this.#tripInfoComponent);
  }
}
