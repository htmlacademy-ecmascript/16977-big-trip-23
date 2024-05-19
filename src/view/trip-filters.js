import AbstractView from '../framework/view/abstract-view.js';
import { FiltersBuilder } from '../util/filters-builder.js';

const createFilterTypeTemplate = (item) => `
  <div class="trip-filters__filter">
    <input id="filter-${item.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
    value="${item.type.toLowerCase()}" ${item.checked ? 'checked' : ''}  ${!item.data.length ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${item.type.toLowerCase()}">${item.type}</label>
  </div>`;

const createTripFiltersTemplate = ({ filters }) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((item) => createFilterTypeTemplate(item)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class TripFilters extends AbstractView {
  #mainPoints = [];
  #filters = [];

  constructor({ mainPoints }) {
    super();

    this.#mainPoints = mainPoints;

    this.#filters = [
      {
        type: 'Everything',
        checked: true,
        data: new FiltersBuilder({ data: this.#mainPoints }).getEverythingPoints(),
      },
      {
        type: 'Future',
        data: new FiltersBuilder({ data: this.#mainPoints }).getFuturePoints(),
      },
      {
        type: 'Present',
        data: new FiltersBuilder({ data: this.#mainPoints }).getPresentPoints(),
      },
      {
        type: 'Past',
        data: new FiltersBuilder({ data: this.#mainPoints }).getPastPoints(),
      },
    ];
  }

  get template() {
    return createTripFiltersTemplate({ filters: this.#filters });
  }
}
