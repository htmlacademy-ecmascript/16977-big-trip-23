import AbstractView from '../framework/view/abstract-view.js';

const createEventAddBtnTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class EventAddButton extends AbstractView {
  #handleAddNewPointButtonClick = null;

  constructor({ onClickAddNewPointButton }) {
    super();

    this.#handleAddNewPointButtonClick = onClickAddNewPointButton;

    this.element.addEventListener('click', this.#addNewPointButtonClickHandler);
  }

  get template() {
    return createEventAddBtnTemplate();
  }

  #addNewPointButtonClickHandler = (evt) => {
    evt.preventDefault();

    this.#handleAddNewPointButtonClick();
  };
}
