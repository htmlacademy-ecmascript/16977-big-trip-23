import { points } from '../mock/points.js';

export default class PointsModel {
  points = points;

  getPoints() {
    return this.points;
  }
}
