import { createElement } from '../render.js';

const FILTER_TYPES = [
  {
    type: 'Everything',
    checked: true,
  },
  {
    type: 'Future',
  },
  {
    type: 'Present',
  },
  {
    type: 'Past',
  },
];

const createFilterTypeTemplate = (data) => {
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${data.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${data.type.toLowerCase()}" ${data.checked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${data.type.toLowerCase()}">${data.type}</label>
    </div>`
  );
};

const createTripFiltersTemplate = () => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${FILTER_TYPES.map(item => createFilterTypeTemplate(item)).join('')}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilters {
  getTemplate() {
    return createTripFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
