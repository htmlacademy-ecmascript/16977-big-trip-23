import { UpdateType } from '../constants.js';
import { render, remove } from '../framework/render.js';
import TripFilters from '../view/trip-filters.js';

export default class FiltersPresenter {
  #filtersModel = null;
  #pointsModel = [];

  #currentFilter = null;

  #tripFiltersComponent = null;

  #pageHeaderElement = null;
  #tripFiltersElement = null;

  constructor({ filtersModel, pointsModel }) {
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#destroy();

    this.#currentFilter = this.#filtersModel.filter;

    this.#pageHeaderElement = document.querySelector('.page-header');
    this.#tripFiltersElement = this.#pageHeaderElement.querySelector('.trip-controls__filters');

    this.#tripFiltersComponent = new TripFilters({
      currentFilter: this.#currentFilter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    render(this.#tripFiltersComponent, this.#tripFiltersElement);
  }

  #destroy() {
    remove(this.#tripFiltersComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
