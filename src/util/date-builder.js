import dayjs from 'dayjs';
import { timeInMillisecond } from '../constants';

export default class DateBuilder {
  constructor({ date, dateFrom, dateTo }) {
    this.date = date;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
  }

  getTime() {
    return dayjs(this.date).format('HH:ss');
  }

  getMonthAndDay() {
    return dayjs(this.date).format('MMM DD');
  }

  getFullDate() {
    return dayjs(this.date).format('YYYY-MM-DD');
  }

  getFullDateAndTime() {
    return dayjs(this.date).format('YYYY-MM-DDTHH:ss');
  }

  getFullDateAndTimeCalendarFormat() {
    return dayjs(this.date).format('DD-MM-YY HH:ss');
  }

  getDifferenceTime() {
    const differenceMillisecond = dayjs(this.dateTo).diff(this.dateFrom, 'millisecond');
    let currentDifference;

    if (differenceMillisecond < timeInMillisecond.HOUR) {
      currentDifference = dayjs(differenceMillisecond).format('mm[M]');
    } else if ((differenceMillisecond >= timeInMillisecond.HOUR) && (differenceMillisecond < timeInMillisecond.DAY)) {
      currentDifference = dayjs(differenceMillisecond).format('HH[H] mm[M]');
    } else if (differenceMillisecond >= timeInMillisecond.DAY) {
      currentDifference = dayjs(differenceMillisecond).format('DD[D] HH[H] mm[M]');
    }

    return currentDifference;
  }
}
