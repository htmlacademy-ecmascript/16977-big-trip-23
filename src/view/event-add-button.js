import AbstractView from '../framework/view/abstract-view.js';

const createEventAddBtnTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class EventAddButton extends AbstractView {
  #handleShowAddNewPointForm = null;

  constructor({ onClickAddNewPointButton }) {
    super();

    this.#handleShowAddNewPointForm = onClickAddNewPointButton;

    this.element.addEventListener('click', this.#showAddNewPointFormHandler);
  }

  get template() {
    return createEventAddBtnTemplate();
  }

  #showAddNewPointFormHandler = (evt) => {
    evt.preventDefault();

    this.#handleShowAddNewPointForm();
  };
}
