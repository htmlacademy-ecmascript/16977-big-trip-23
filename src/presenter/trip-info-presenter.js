import { render, RenderPosition } from '../framework/render.js';
import TripInfo from '../view/trip-info.js';

export default class TripInfoPresenter {
  #pointsModel = [];

  #tripInfoComponent = null;

  #pageHeaderElement = null;
  #tripMainElement = null;

  constructor({ pointsModel }) {
    this.#pointsModel = pointsModel;

    this.#tripInfoComponent = new TripInfo();

    this.#pageHeaderElement = document.querySelector('.page-header');
    this.#tripMainElement = this.#pageHeaderElement.querySelector('.trip-main');
  }

  init() {
    render(this.#tripInfoComponent, this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }
}
