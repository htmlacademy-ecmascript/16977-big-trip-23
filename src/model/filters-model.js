import Observable from '../framework/observable.js';
import { FiltersType } from '../constants.js';

export default class FiltersModel extends Observable {
  #filter = FiltersType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, data) {
    this.#filter = data.filter;

    this._notify(updateType, data);
  }
}
