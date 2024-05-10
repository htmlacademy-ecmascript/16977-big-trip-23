import dayjs from 'dayjs';
import { TimeInMillisecond } from '../constants';

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
    return dayjs(this.date).format('DD/MM/YY HH:ss');
  }

  getDifferenceTime() {
    const differenceMillisecond = dayjs(this.dateTo).diff(this.dateFrom, 'millisecond');
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
}
