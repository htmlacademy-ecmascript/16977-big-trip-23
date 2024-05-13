import AbstractView from '../framework/view/abstract-view.js';

const createTripListContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class TripListContainer extends AbstractView {
  get template() {
    return createTripListContainerTemplate();
  }
}
