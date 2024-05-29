import dayjs from 'dayjs';
import DateBuilder from './date-builder.js';

export class SortBuilder {
  #data = [];

  constructor({ data }) {
    this.#data = data;
  }

  getDaySort() {
    return this.#data.sort((a, b) => dayjs(a.dateFrom).valueOf() - dayjs(b.dateFrom).valueOf());
  }

  getSortByTime() {
    return this.#data.sort((a, b) => new DateBuilder({ dateFrom: b.dateFrom, dateTo: b.dateTo }).getDurationTime() - new DateBuilder({ dateFrom: a.dateFrom, dateTo: a.dateTo }).getDurationTime());
  }

  getSortByPrice() {
    return this.#data.sort((a, b) => b.basePrice - a.basePrice);
  }
}
