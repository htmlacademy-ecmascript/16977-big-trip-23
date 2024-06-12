import AbstractView from '../framework/view/abstract-view.js';
import { FiltersType } from '../constants.js';
import { FiltersBuilder } from '../util/filters-builder.js';

const createFilterTypeTemplate = (filteredCollections, filterName, currentFilter) => `
  <div class="trip-filters__filter">
    <input id="filter-${filterName.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
    value="${filterName.toLowerCase()}" ${filterName === currentFilter ? 'checked' : ''}  ${!filteredCollections[filterName].length ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${filterName.toLowerCase()}">${filterName}</label>
  </div>`;

const createTripFiltersTemplate = ({ filteredCollections, currentFilter }) => `
  <form class="trip-filters" action="#" method="get">
    ${Object.values(FiltersType).map((filterName) => createFilterTypeTemplate(filteredCollections, filterName, currentFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class TripFilters extends AbstractView {
  #points = [];

  #currentFilter = null;
  #filteredCollections = {};

  #handleFilterTypeChange = null;

  constructor({ points, currentFilter, onFilterTypeChange }) {
    super();

    this.#points = points;
    this.#currentFilter = currentFilter;
    this.#filteredCollections = new FiltersBuilder({ data: this.#points }).getFilteredCollections();

    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTripFiltersTemplate({ filteredCollections: this.#filteredCollections, currentFilter: this.#currentFilter });
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this.#handleFilterTypeChange(evt.target.value);
  };
}
