import { createContainer, asValue, asFunction } from 'awilix'

import app from './app';
import database from './config/database';

const container = createContainer();

container.register({
  app: asFunction(app).singleton(),
  database: asFunction(database).singleton(),
});

module.exports = container;