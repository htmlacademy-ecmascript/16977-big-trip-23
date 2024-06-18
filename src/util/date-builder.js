import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, TimeInMillisecond } from '../constants.js';
import { addZeroToNumber } from './common.js';

dayjs.extend(duration);

export default class DateBuilder {
  #date = null;
  #dateFrom = null;
  #dateTo = null;
  #points = null;

  constructor({ date, dateFrom, dateTo, points }) {
    this.#date = date;
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
    this.#points = points;
  }

  getTime() {
    return dayjs(this.#date).format(DateFormat.TIME);
  }

  getMonthAndDay() {
    return dayjs(this.#date).format(DateFormat.DATE_MONTH);
  }

  getFullDate() {
    return dayjs(this.#date).format(DateFormat.DATE);
  }

  getFullDateAndTime() {
    return dayjs(this.#date).format(DateFormat.DATE_TIME_SYSTEM);
  }

  getFullDateAndTimeCalendarFormat() {
    if (this.#date === null) {
      return '';
    }

    return dayjs(this.#date).format(DateFormat.DATE_TIME);
  }

  getDifferenceTime() {
    const differenceMillisecond = dayjs(this.#dateTo).diff(dayjs(this.#dateFrom));
    const dateDuration = dayjs.duration(differenceMillisecond);

    const days = String(Math.floor(dateDuration.asDays()));
    const hours = String(dateDuration.hours());
    const minutes = String(dateDuration.minutes());

    let currentDifference;

    if (differenceMillisecond < TimeInMillisecond.HOUR) {
      currentDifference = `${addZeroToNumber(minutes)}M`;
    } else if ((differenceMillisecond >= TimeInMillisecond.HOUR) && (differenceMillisecond < TimeInMillisecond.DAY)) {
      currentDifference = `${addZeroToNumber(hours)}H ${addZeroToNumber(minutes)}M`;
    } else if (differenceMillisecond >= TimeInMillisecond.DAY) {
      currentDifference = `${addZeroToNumber(days)}D ${addZeroToNumber(hours)}H ${addZeroToNumber(minutes)}M`;
    }

    return currentDifference;
  }

  getDurationTime() {
    return dayjs(this.#dateTo).diff(dayjs(this.#dateFrom));
  }

  getMinDate() {
    const minDateCollection = this.#points.map((point) => dayjs(point.dateFrom)).sort((a, b) => a - b);

    if (!minDateCollection.length) {
      return;
    }

    return minDateCollection[0].format(DateFormat.MONTH_DAY);
  }

  getMaxDate() {
    const maxDateCollection = this.#points.map((point) => dayjs(point.dateTo)).sort((a, b) => b - a);

    if (!maxDateCollection.length) {
      return;
    }

    return maxDateCollection[0].format(DateFormat.MONTH_DAY);
  }

  static isDateEqual(firstDate, secondDate) {
    return (firstDate === null && secondDate === null) ?? dayjs(firstDate).isSame(secondDate, 'D');
  }
}
