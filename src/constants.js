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
  MAJOR: 'MAJOR',
  INIT: 'INIT'
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

const AUTHORIZATION = 'Basic ladnoitaksoidet!';

const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const EventMessage = {
  FAILED_LOAD_DATA: 'Failed to load latest route information',
  LOADING: 'Loading...'
};

const TimeLimitUiBlockAnimation = {
  LOWER: 350,
  UPPER: 1000
};

const MAX_VISIBLE_CITIES = 3;

export { TravelSortItem, TimeInMillisecond, Mode, UserAction, UpdateType, FiltersType, FilterMessage, AUTHORIZATION, END_POINT, EventMessage, TimeLimitUiBlockAnimation, MAX_VISIBLE_CITIES };
