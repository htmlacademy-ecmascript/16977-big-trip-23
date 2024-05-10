import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

import MainPresenter from './presenter/main-presenter.js';

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const mainPresenter = new MainPresenter({ pointsModel, destinationsModel, offersModel });

mainPresenter.init();
