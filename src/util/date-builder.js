import dayjs from 'dayjs';
import { TimeInMillisecond } from '../constants.js';

export default class DateBuilder {
  #date = null;
  #dateFrom = null;
  #dateTo = null;

  constructor({ date, dateFrom, dateTo }) {
    this.#date = date;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
  }

  getTime() {
    return dayjs(this.#date).format('HH:mm');
  }

  getMonthAndDay() {
    return dayjs(this.#date).format('MMM DD');
  }

  getFullDate() {
    return dayjs(this.#date).format('YYYY-MM-DD');
  }

  getFullDateAndTime() {
    return dayjs(this.#date).format('YYYY-MM-DDTHH:ss');
  }

  getFullDateAndTimeCalendarFormat() {
    if (this.#date === null) {
      return '';
    }

    return dayjs(this.#date).format('DD/MM/YY HH:mm');
  }

  getDifferenceTime() {
    const differenceMillisecond = dayjs(this.#dateTo).diff(this.#dateFrom, 'millisecond');
    let currentDifference;

    if (differenceMillisecond < TimeInMillisecond.HOUR) {
      currentDifference = dayjs(differenceMillisecond).format('mm[M]');
    } else if ((differenceMillisecond >= TimeInMillisecond.HOUR) && (differenceMillisecond < TimeInMillisecond.DAY)) {
      currentDifference = dayjs(differenceMillisecond).format('HH[H] mm[M]');
    } else if (differenceMillisecond >= TimeInMillisecond.DAY) {
      currentDifference = dayjs(differenceMillisecond).format('DD[D] HH[H] mm[M]');
    }

    return currentDifference;
  }

  getDurationTime() {
    return dayjs(this.#dateTo).diff(dayjs(this.#dateFrom));
  }

  static isDateEqual(firstDate, secondDate) {
    return (firstDate === null && secondDate === null) ?? dayjs(firstDate).isSame(secondDate, 'D');
  }
}
