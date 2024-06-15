import ApiService from '../framework/api-service.js';
import AdapterBuilder from '../util/adapter-builder.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const ContentType = {
  APPLICATION: {
    JSON: 'application/json'
  }
};

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  async addPoint(point) {
    const adaptedPointToServer = AdapterBuilder.adaptPointToServer(point);

    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(adaptedPointToServer),
      headers: new Headers({ 'Content-Type': ContentType.APPLICATION.JSON })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async updatePoint(point) {
    const adaptedPointToServer = AdapterBuilder.adaptPointToServer(point);

    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(adaptedPointToServer),
      headers: new Headers({ 'Content-Type': ContentType.APPLICATION.JSON })
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
