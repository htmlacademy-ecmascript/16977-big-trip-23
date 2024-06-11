import { FiltersType } from '../constants.js';
import AbstractView from '../framework/view/abstract-view.js';

const createFilterTypeTemplate = (filterName, currentFilter) => `
  <div class="trip-filters__filter">
    <input id="filter-${filterName.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
    value="${filterName.toLowerCase()}" ${filterName === currentFilter ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filterName.toLowerCase()}">${filterName}</label>
  </div>`;

const createTripFiltersTemplate = ({ currentFilter }) => `
  <form class="trip-filters" action="#" method="get">
    ${Object.values(FiltersType).map((filterName) => createFilterTypeTemplate(filterName, currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class TripFilters extends AbstractView {
  #currentFilter = null;

  #handleFilterTypeChange = null;

  constructor({ currentFilter, onFilterTypeChange }) {
    super();

    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTripFiltersTemplate({ currentFilter: this.#currentFilter });
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this.#handleFilterTypeChange(evt.target.value);
  };
}
