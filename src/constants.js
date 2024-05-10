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

const TimeInMillisecond = {
  HOUR: 3600000,
  DAY: 86400000,
};

export { FILTER_TYPES, TRAVEL_SORT_ITEMS, TimeInMillisecond };
