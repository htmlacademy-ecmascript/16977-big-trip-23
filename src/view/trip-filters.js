import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPES } from '../constants.js';

const createFilterTypeTemplate = (data) => `
  <div class="trip-filters__filter">
    <input id="filter-${data.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${data.type.toLowerCase()}" ${data.checked ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${data.type.toLowerCase()}">${data.type}</label>
  </div>`;

const createTripFiltersTemplate = () => `
  <form class="trip-filters" action="#" method="get">
    ${FILTER_TYPES.map((item) => createFilterTypeTemplate(item)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class TripFilters extends AbstractView {
  get template() {
    return createTripFiltersTemplate();
  }
}
