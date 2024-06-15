import { UpdateType } from '../constants.js';
import Observable from '../framework/observable.js';
import AdapterBuilder from '../util/adapter-builder.js';

export default class PointsModel extends Observable {
  #service = null;
  #offersModel = null;
  #destinationsModel = null;

  #points = [];

  constructor({ service, offersModel, destinationsModel }) {
    super();

    this.#service = service;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      await Promise.all([this.#offersModel.init(), this.#destinationsModel.init()]);

      const points = await this.#service.points;
      this.#points = points.map((point) => AdapterBuilder.adaptPointToClient(point));

      this._notify(UpdateType.INIT, { isError: false });
    } catch (err) {
      this.#points = [];

      this._notify(UpdateType.INIT, { isError: true });
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#service.addPoint(update);
      const updatePoint = AdapterBuilder.adaptPointToClient(response);

      this.#points = [
        updatePoint,
        ...this.#points
      ];

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const response = await this.#service.updatePoint(update);
      const updatedPoint = AdapterBuilder.adaptPointToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      await this.#service.deletePoint(update)

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, update);
    } catch (err) {
      throw new Error('Can\'t delete point');
    }
  }
}
