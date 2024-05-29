const TravelSortItems = {
  DAY: {
    fieldName: 'day',
    fieldTitle: 'Day',
    fieldStatus: 'on',
    checked: true,
  },
  EVENT: {
    fieldName: 'event',
    fieldTitle: 'Event',
    fieldStatus: 'off',
  },
  TIME: {
    fieldName: 'time',
    fieldTitle: 'Time',
    fieldStatus: 'on',
  },
  PRICE: {
    fieldName: 'price',
    fieldTitle: 'Price',
    fieldStatus: 'on',
  },
  OFFER: {
    fieldName: 'offer',
    fieldTitle: 'Offers',
    fieldStatus: 'off',
  },
};

const TimeInMillisecond = {
  HOUR: 3600000,
  DAY: 86400000,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDIT: 'EDIT',
};

export { TravelSortItems, TimeInMillisecond, Mode };
