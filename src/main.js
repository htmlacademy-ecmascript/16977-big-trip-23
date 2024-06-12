import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';

import MainPresenter from './presenter/main-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const filtersModel = new FiltersModel();

const tripInfoPresenter = new TripInfoPresenter({ pointsModel });
const filtersPresenter = new FiltersPresenter({ filtersModel, pointsModel });
const mainPresenter = new MainPresenter({ pointsModel, destinationsModel, offersModel, filtersModel });

tripInfoPresenter.init();
filtersPresenter.init();

mainPresenter.init();
