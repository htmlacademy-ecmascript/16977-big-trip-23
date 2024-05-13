import { points } from '../mock/points.js';

export default class PointsModel {
  #points = points;

  get points() {
    return this.#points;
  }
}
