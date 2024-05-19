import AbstractView from '../framework/view/abstract-view.js';

const createTripEmptyTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class TripEmpty extends AbstractView {
  get template() {
    return createTripEmptyTemplate();
  }
}
