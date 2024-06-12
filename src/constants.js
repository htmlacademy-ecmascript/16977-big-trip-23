const TravelSortItem = {
  DAY: {
    fieldName: 'day',
    fieldTitle: 'Day',
    fieldStatus: 'on',
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const FiltersType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FilterMessage = {
  [FiltersType.EVERYTHING]: 'Click New Event to create your first point',
  [FiltersType.FUTURE]: 'There are no future events now',
  [FiltersType.PRESENT]: 'There are no present events now',
  [FiltersType.PAST]: 'There are no past events now'
};

export { TravelSortItem, TimeInMillisecond, Mode, UserAction, UpdateType, FiltersType, FilterMessage };
