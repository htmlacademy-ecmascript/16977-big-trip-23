const TRAVEL_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const TRAVEL_CITIES = [
  'Amsterdam',
  'Geneva',
  'Chamonix',
];

const TRAVEL_OFFERS = [
  {
    key: 'luggage',
    title: 'Add luggage',
    price: '30',
    checked: true,
  },
  {
    key: 'comfort',
    title: 'Switch to comfort class',
    price: '100',
    checked: true,
  },
  {
    key: 'meal',
    title: 'Add meal',
    price: '15',
  },
  {
    key: 'seats',
    title: 'Choose seats',
    price: '5',
  },
  {
    key: 'train',
    title: 'Travel by train',
    price: '40',
  }
];

const FILTER_TYPES = [
  {
    type: 'Everything',
    checked: true,
  },
  {
    type: 'Future',
  },
  {
    type: 'Present',
  },
  {
    type: 'Past',
  },
];

const TRAVEL_SORT_ITEMS = [
  {
    key: 'day',
    title: 'Day',
    checked: true,
  },
  {
    key: 'event',
    title: 'Event',
    disabled: true,
  },
  {
    key: 'time',
    title: 'Time',
  },
  {
    key: 'price',
    title: 'Price',
  },
  {
    key: 'offer',
    title: 'Offers',
    disabled: true,
  },
];

const EVENT_POINT_COUNT = 3;

export { TRAVEL_TYPES, TRAVEL_CITIES, TRAVEL_OFFERS, FILTER_TYPES, TRAVEL_SORT_ITEMS, EVENT_POINT_COUNT }
