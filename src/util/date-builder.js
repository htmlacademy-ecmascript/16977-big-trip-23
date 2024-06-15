import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { TimeInMillisecond } from '../constants.js';

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
    const differenceMillisecond = dayjs(this.#dateTo).diff(dayjs(this.#dateFrom));
    const dateDuration = dayjs.duration(differenceMillisecond);

    const years = Math.floor(dateDuration.asYears());
    const days = Math.floor(dateDuration.asDays()) - (years * 365);
    const hours = dateDuration.hours();
    const minutes = dateDuration.minutes();

    let currentDifference;

    if (differenceMillisecond < TimeInMillisecond.HOUR) {
      currentDifference = `${minutes}M`;
    } else if ((differenceMillisecond >= TimeInMillisecond.HOUR) && (differenceMillisecond < TimeInMillisecond.DAY)) {
      currentDifference = `${hours}H ${minutes}M`;
    } else if (differenceMillisecond >= TimeInMillisecond.DAY) {
      currentDifference = `${days}D ${hours}H ${minutes}M`;
    }

    return currentDifference;
  }

  getDurationTime() {
    return dayjs(this.#dateTo).diff(dayjs(this.#dateFrom));
  }

  getMinDate() {
    const minDateCollection = this.#points.map((point) => dayjs(point.dateFrom)).sort((a, b) => a - b);
    const minDate = minDateCollection[0].format('DD MMM');

    return minDate;
  }

  getMaxDate() {
    const maxDateCollection = this.#points.map((point) => dayjs(point.dateTo)).sort((a, b) => b - a);
    const maxDate = maxDateCollection[0].format('DD MMM');

    return maxDate;
  }

  static isDateEqual(firstDate, secondDate) {
    return (firstDate === null && secondDate === null) ?? dayjs(firstDate).isSame(secondDate, 'D');
  }
}
