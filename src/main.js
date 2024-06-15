import { AUTHORIZATION, END_POINT } from './constants.js';

import PointsApiService from './service/points-api-service.js';

import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';

import MainPresenter from './presenter/main-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const service = new PointsApiService(END_POINT, AUTHORIZATION);

const offersModel = new OffersModel(service);
const destinationsModel = new DestinationsModel(service);
const pointsModel = new PointsModel({ service, offersModel, destinationsModel });

const filtersModel = new FiltersModel();

const filtersPresenter = new FiltersPresenter({ filtersModel, pointsModel });
const mainPresenter = new MainPresenter({ pointsModel, destinationsModel, offersModel, filtersModel });

filtersPresenter.init();
mainPresenter.init();

pointsModel.init();
