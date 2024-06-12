import dayjs from 'dayjs';
import { FiltersType } from '../constants';

export class FiltersBuilder {
  #data = [];

  constructor({ data = [] }) {
    this.#data = data;
  }

  getEverythingPoints() {
    return this.#data;
  }

  getFuturePoints() {
    return this.#data.filter((item) => dayjs(item.dateFrom) > dayjs(new Date()));
  }

  getPresentPoints() {
    return this.#data.filter((item) => (dayjs(item.dateFrom) <= dayjs(new Date())) && (dayjs(item.dateTo) >= dayjs(new Date())));
  }

  getPastPoints() {
    return this.#data.filter((item) => dayjs(item.dateFrom) < dayjs(new Date()));
  }

  getFilteredCollections() {
    return {
      [FiltersType.EVERYTHING]: this.getEverythingPoints(),
      [FiltersType.FUTURE]: this.getFuturePoints(),
      [FiltersType.PRESENT]: this.getPresentPoints(),
      [FiltersType.PAST]: this.getPastPoints()
    };
  }

  getFilteredPoints(filter) {
    switch (filter) {
      case FiltersType.EVERYTHING:
        return this.getEverythingPoints();
      case FiltersType.FUTURE:
        return this.getFuturePoints();
      case FiltersType.PRESENT:
        return this.getPresentPoints();
      case FiltersType.PAST:
        return this.getPastPoints();
    }
  }
}
