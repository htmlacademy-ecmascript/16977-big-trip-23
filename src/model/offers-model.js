export default class OffersModel {
  #service = null;

  #offers = [];

  constructor(service) {
    this.#service = service;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    this.#offers = await this.#service.offers;

    return this.#offers;
  }

  getOffersCurrentPoint(point) {
    const pointOffersID = point.offers;
    const listOffersTypePoint = this.#offers.find((offer) => offer.type === point.type).offers;

    const currentOffers = pointOffersID.map((offerID) => listOffersTypePoint.find((offerTypePoint) => offerTypePoint.id === offerID));

    return currentOffers;
  }
}
