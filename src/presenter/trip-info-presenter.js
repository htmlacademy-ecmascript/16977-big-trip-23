import { render, RenderPosition, remove } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class TripInfoPresenter {
  #points = [];
  #destinationsModel = null;

  #tripInfoComponent = null;

  #pageHeaderElement = null;
  #tripMainElement = null;

  constructor({ points, destinationsModel }) {
    this.#points = points;
    this.#destinationsModel = destinationsModel;

    this.#tripInfoComponent = new TripInfo({ points: this.#points, destinationsModel: this.#destinationsModel });

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
