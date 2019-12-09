import { createContainer, asFunction, asValue } from 'awilix'

import app from './server';
import database from './config/database/index';
import resources from './resources';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  database: asFunction(database).singleton(),
  resources: asValue(resources),
});

module.exports = container;