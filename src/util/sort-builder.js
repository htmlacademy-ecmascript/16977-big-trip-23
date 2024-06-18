import dayjs from 'dayjs';
import DateBuilder from './date-builder.js';

export default class SortBuilder {
  #data = [];

  constructor({ data }) {
    this.#data = data;
  }

  getDaySort() {
    return this.#data.sort((nextPoint, prevPoint) => dayjs(nextPoint.dateFrom).valueOf() - dayjs(prevPoint.dateFrom).valueOf());
  }

  getSortByTime() {
    return this.#data.sort((nextPoint, prevPoint) => new DateBuilder({ dateFrom: prevPoint.dateFrom, dateTo: prevPoint.dateTo }).getDurationTime() - new DateBuilder({ dateFrom: nextPoint.dateFrom, dateTo: nextPoint.dateTo }).getDurationTime());
  }

  getSortByPrice() {
    return this.#data.sort((nextPoint, prevPoint) => prevPoint.basePrice - nextPoint.basePrice);
  }
}
