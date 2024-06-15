export default class AdapterBuilder {
  #data = {};

  constructor({ data }) {
    data = data;
  }

  static adaptPointToServer(data) {
    const point = {
      ...data,
      'base_price': Number(data.basePrice),
      'date_from': data.dateFrom instanceof Date ? data.dateFrom.toISOString() : null,
      'date_to': data.dateTo instanceof Date ? data.dateTo.toISOString() : null,
      'is_favorite': data.isFavorite
    }

    delete point.basePrice;
    delete point.dateFrom;
    delete point.dateTo;
    delete point.isFavorite;

    return point;
  }

  static adaptPointToClient(data) {
    const point = {
      ...data,
      'basePrice': Number(data.base_price),
      'dateFrom': data.date_from !== null ? new Date(data.date_from) : data.date_from,
      'dateTo': data.date_to !== null ? new Date(data.date_to) : data.date_to,
      'isFavorite': data.is_favorite
    }

    delete point.base_price;
    delete point.date_from;
    delete point.date_to;
    delete point.is_favorite;

    return point;
  }
}
