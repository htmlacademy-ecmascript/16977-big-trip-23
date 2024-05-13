import { offers } from '../mock/offers.js';

export default class OffersModel {
  #offers = offers;

  get offers() {
    return this.#offers;
  }

  getOffersCurrentPoint(point) {
    const pointOffersID = point.offers;
    const listOffersTypePoint = this.offers.find((offer) => offer.type === point.type).offers;

    const currentOffers = pointOffersID.map((offerID) => listOffersTypePoint.find((offerTypePoint) => offerTypePoint.id === offerID));

    return currentOffers;
  }
}
