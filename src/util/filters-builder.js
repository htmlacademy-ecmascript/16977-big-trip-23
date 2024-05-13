import dayjs from 'dayjs';

export class FiltersBuilder {
  #data = [];

  constructor({ data }) {
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
    return this.#data.filter((item) => dayjs(item.dateTo) < dayjs(new Date()));
  }
}
